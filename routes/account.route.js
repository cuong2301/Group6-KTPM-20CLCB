import express from 'express';
import bcrypt from 'bcryptjs';


import userService from '../services/user.service.js';

const router = express.Router();

router.get('/register', async function (req, res) {
    res.render('vwAccount/register');
});

router.post('/register', async function (req, res) {
    const rawPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);

    const user = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        permission: 0
    }
    await userService.add(user);
    res.render('vwAccount/register');
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

export default router;