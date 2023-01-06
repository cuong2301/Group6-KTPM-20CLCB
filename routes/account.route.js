import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

import userService from "../services/user.service.js";
import adminRole from "../middlewares/adminRole.mdw.js";

import passport from 'passport'
const router = express.Router();



router.get("/register", async function (req, res) {
  res.render("vwAccount/register");
});

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
let otp = generateOTP();

let userOtp;
router.post("/register", async function (req, res) {
  const rawPassword = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(rawPassword, salt);
  console.log(req.session.auth);
  userOtp = {
    username: req.body.username,
    password: hash,
    email: req.body.email,
    permission: 2,
  };
  //console.log(userOtp.email);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tvqhuy20@clc.fitus.edu.vn",
      pass: "pmotugbxlmwowbjp",
    },
  });
  const string = userOtp.email;
  const mailOptions = {
    from: "tvqhuy20@clc.fitus.edu.vn",
    to: string,
    subject: "Your OTP to verify your account",
    text: otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  //await userService.add(user);
  res.redirect("register/verify");
});

router.get("/profile", async function (req, res) {
  if (req.session.authUser==null){
    res.redirect("/account/login");
  }
  else{
  const user_id = req.session.authUser.id;
  const user = await userService.findById(user_id);
  req.session.authUser = user;



  res.render("vwAccount/profile", {
    user: user,

  });
}});

router.post("/profile", async function (req, res) {
 let user= req.session.authUser;
  let errormessage = "changes success !!!";
  if (req.body.username != "") {
    req.session.authUser.username=req.body.username;
    await userService.update(req.body.username,user.id);
  }
  if (req.body.email != "") {
    const re =
      /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;
    const email = req.body.email;
    if (re.test(email) === false) {
      errormessage = "Please fill correct email";
    }
    else{
      req.session.authUser.email=req.body.email;
      await userService.updateAll(user.id,req.session.authUser);
    }
  }
  const ret = bcrypt.compareSync(req.body.oldpassword, user.password);
  if (req.body.password != "") {
    if (req.body.password != req.body.passwordconfirm) {
      errormessage = "Please confirm correct password";
    }
    if(req.body.oldpassword==""){
      errormessage = "Please enter password";
    }
    if(ret===false){
      errormessage = "Incorrect password !!";
    }
    if(ret===true){
      if (req.body.password != req.body.passwordconfirm) {
      } else {
        const rawPassword = req.body.passwordconfirm;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(rawPassword, salt);
        let usernew = {
          id :req.session.authUser.id,
          username: req.session.authUser.username,
          password: hash,
          email: req.session.authUser.email,
          permission: 0,
        };
        req.session.authUser = usernew;
        await userService.updateAll(user.id, req.session.authUser);
      }
    }
  }
  if (req.body.oldpassword != "") {
    if(req.body.password  ==""){
      errormessage = "Please confirm password";
    }
    if(req.body.password != req.body.passwordconfirm) {
      errormessage = "Please confirm correct password";
    }
  }
  user=req.session.authUser;

  req.session.message=errormessage;
  return res.render("vwAccount/profile", {
    errormessage: errormessage,
    user:user
  });
});

// eg: /is-available?user=ryu
router.get("/is-available", async function (req, res) {
  const email = req.query.email;
  const user = await userService.findByEmail(email);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
});

router.get("/login", function (req, res) {
  res.render("vwAccount/login");
});

router.post("/login", async function (req, res) {
  const user = await userService.findByEmail(req.body.email);
  if (user === null) {
    return res.render("vwAccount/login", {
      err_message: "Invalid username or password.",
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.password);
  if (ret === false) {
    return res.render("vwAccount/login", {
      err_message: "Invalid username or password.",
    });
  }

  delete user.password;

  console.log(req.session.auth);

  req.session.auth = true;
  req.session.authUser = user;
  if(req.session.authUser.permission == 0){ // 0 is admin
    res.redirect("/admin/users");
  }
  else if(req.session.authUser.permission == 2){// 2 is user
    const url = req.session.retUrl || "/";
    res.redirect(url);
  } else if(req.session.authUser.permission == 1){
    res.redirect("/teacher/courses");
  }
});

router.post("/logout", async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;

  const url = req.headers.referer || "/";
  res.redirect(url);
});

router.get("/register/verify", function (req, res) {
  res.render("vwAccount/otp");
});

router.post("/register/verify", async function (req, res) {
  const otpIn = [
    req.body.otp1,
    req.body.otp2,
    req.body.otp3,
    req.body.otp4,
    req.body.otp5,
    req.body.otp6,
  ];
  let stringOtp = "";
  for (let i = 0; i < otpIn.length; i++) {
    stringOtp += `${otpIn[i]}`;
  }
  console.log(userOtp);
  console.log(otp);
  console.log(stringOtp);
  if (otp.toString() === stringOtp.toString()) {
    await userService.add(userOtp);
    //window.alert("Successful register!");
    res.redirect("/account/login");
  } else {
    //window.alert("Wrong otp");
  }
});

router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

export default router;
