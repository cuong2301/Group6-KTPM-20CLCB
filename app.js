import express from "express";
import hbs_sections from "express-handlebars-sections";
import { engine } from "express-handlebars";
import session from "express-session";

import { dirname } from "path";
import { fileURLToPath } from "url";

import numeral from "numeral";

import categoryRoute from "./routes/category.route.js";
import coursesService from "./services/courses.service.js";
import accountRoute from "./routes/account.route.js";
import coursesUserService from "./routes/courses-user.route.js";
import categoryService from "./services/category.service.js";
import adminRoute from "./routes/admin.route.js";

import coursesRoute from "./routes/courses.route.js";
import activate_session from "./middlewares/session.mdw.js";
import activate_locals from "./middlewares/locals.mdw.js";

import cookieParser from "cookie-parser";
import FacebookStrategy from "passport-facebook";
import bodyParser from "body-parser";
import config from "./utils/config.js";
import teacherRoute from "./routes/teacher.route.js";
import passport from "passport";
import router from "./routes/account.route.js";
import bcrypt from "bcryptjs";
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/err", function (req, res) {
  throw new Error("Something Broke");
});

app.use("/public", express.static("public"));

app.engine(
  "hbs",
  engine({
    // defaultLayout: 'main.hbs'
    extname: "hbs",
    defaultLayout: "bs4",
    helpers: {
      section: hbs_sections(),
      format_number(val) {
        return numeral(val).format("0,0");
      },
      eq(arg1, arg2) {
        return +arg1 === +arg2;
      },
      minus(a, b) {
        return a - b;
      },
      add(a, b) {
        return a + b;
      },
      eqString(arg1, arg2) {
        if (arg1.localeCompare(arg2) === 0) {
          return true;
        }
        return false;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(async function (req, res, next) {
  let obj = [];
  obj.parent = await categoryService.findCatParent();
  obj.child = await categoryService.findAllWithDetails();
  //console.log(obj);
  res.locals.lcCategories = await categoryService.findAllWithDetails();
  res.locals.lcCatParent = await categoryService.findCatParent();
  res.locals.lcCat = await categoryService.findNotCatParent();
  next();
});

activate_session(app);
activate_locals(app);

app.get("/", async function (req, res) {
  const newest = await coursesService.findNewestCourses();
  const popula = await coursesService.findPopularCourses();
  const MostEnroll = await categoryService.findMostEnrollCat();
  //const listP = await categoryService.findCatParent();

  console.log(popula);
  //console.log(req.session.auth);
  res.render("home", {
    newest: newest,
    popular: popula,
  });
});

app.post("/", async function (req, res) {
  const a = req.body.score;
  //console.log(a);
  res.redirect("/");
});

app.use("/admin/categories", categoryRoute);
app.use("/admin/Courses", coursesRoute);
app.use("/admin", adminRoute);
app.use("/courses", coursesUserService);
app.use("/account", accountRoute);
app.use("/teacher", teacherRoute);

app.use(function (req, res, next) {
  res.render("404", { layout: false });
});
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).render("500", { layout: false });
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook_api_key,
      clientSecret: config.facebook_api_secret,
      callbackURL: config.callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log(accessToken, refreshToken, profile, done);
        return done(null, profile);
      });
    }
  )
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "keyboard cat", key: "sid" }));
app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-commerce application listening at http://localhost:${PORT}`);
});
