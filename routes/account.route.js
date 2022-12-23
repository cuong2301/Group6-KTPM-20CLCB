import express from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

import userService from '../services/user.service.js';

const router = express.Router();

router.get('/register', async function (req, res) {
    res.render('vwAccount/register');
});

function generateOTP() {

    // Declare a digits variable
    // which stores all digits
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
const otp = generateOTP();

let userOtp;
router.post('/register', async function (req, res) {
    const rawPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);
    console.log(otp);
    userOtp = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        permission: 0
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tvqhuy20@clc.fitus.edu.vn',
            pass: 'pmotugbxlmwowbjp'
        }
    });
    const string = req.body.email;
    const mailOptions = {
        from: 'tvqhuy20@clc.fitus.edu.vn',
        to: string,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    //await userService.add(user);
    res.redirect('register/verify');
});

router.get('/profile', async function (req, res) {
    res.render('vwAccount/profile');
});

// eg: /is-available?user=ryu
router.get('/is-available', async function (req, res) {
    const email = req.query.email;
    const user = await userService.findByEmail(email);
    if (user === null) {
        return res.json(true);
    }

    res.json(false);
});

router.get('/login', function (req, res) {
    res.render('vwAccount/login');
});

router.post('/login', async function (req, res) {
    const user = await userService.findByEmail(req.body.email);
    if (user === null) {
        return res.render('vwAccount/login', {
            err_message: 'Invalid email or password.'
        });
    }

    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
        return res.render('vwAccount/login', {
            err_message: 'Invalid email or password.'
        });
    }
    delete user.password;

    req.session.auth = true;
    req.session.authUser = user;

    const url = req.session.retUrl || '/';
    res.redirect(url);
});

router.get('/register/verify', function (req, res){
    res.render('vwAccount/otp');
})

router.post('/register/verify', function (req, res){
    const otpIn = [req.body.otp1,req.body.otp2,req.body.otp3,req.body.otp4,req.body.otp5,req.body.otp6];
    let stringOtp = "";
    for(let i = 0; i < otpIn.length; i++){
        stringOtp += `${otpIn[i]}`;
    }
    console.log(userOtp);
    console.log(otp);
    console.log(stringOtp);
    res.redirect('/account/login')
});


export default router;