import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import session from "express-session";

import userService from "../services/user.service.js";
import auth from "../middlewares/auth.mdw.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const list = await userService.findAll();
  res.render("vwAccount/admin", {
    users: list,
    empty: list.length === 0,
    layout: "bs5.hbs",
  });
});

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
const otp = generateOTP();

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
    permission: 0,
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
  const user_id = 4;
  const user = await userService.findById(user_id);
  console.log(user);
  res.render("vwAccount/profile", {
    user: user,
  });
});

router.post("/profile", async function (req, res) {
  console.log(req.body);
  let errormessage = "";
  if (req.body.username != "") {
    await userService.update(req.body.username, 4);
  }
  if (req.body.email != "") {
    const re =
      /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;
    const email = req.body.email;
    if (re.test(email) === false) {
      errormessage = "Please fill correct email";
    }
  }
  if (req.body.password != "") {
    if (req.body.password != req.body.passwordconfirm) {
      errormessage = "Please confirm correct password";
    }
  }
  return res.render("vwAccount/profile", {
    errormessage: errormessage,
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
      layout: false,
      err_message: "Invalid username or password.",
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.password);
  if (ret === false) {
    return res.render("vwAccount/login", {
      layout: false,
      err_message: "Invalid username or password.",
    });
  }

  delete user.password;

  console.log(req.session.auth);

  req.session.auth = true;
  req.session.authUser = user;

  const url = req.session.retUrl || "/";
  res.redirect(url);
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

export default router;
