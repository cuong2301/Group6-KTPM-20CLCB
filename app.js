import express from "express";
import hbs_sections from "express-handlebars-sections";
import { engine } from "express-handlebars";
import session from 'express-session';
import asyncErrors from 'express-async-errors' ;

import { dirname } from "path";
import { fileURLToPath } from "url";

import numeral from "numeral";

import categoryRoute from "./routes/category.route.js";
import coursesService from "./services/courses.service.js";
import accountRoute from "./routes/account.route.js";
import coursesUserService from "./routes/courses-user.route.js";
import categoryService from "./services/category.service.js";

import coursesRoute from "./routes/courses.route.js";
import activate_session from "./middlewares/session.mdw.js";
import activate_locals from "./middlewares/locals.mdw.js";

import teacherRoute from "./routes/teacher.route.js";
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/err',function(req,res){
  throw new Error('Something Broke');

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
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(async function (req, res, next) {
  let obj= [];
  obj.parent = await categoryService.findCatParent();
  obj.child = await categoryService.findAllWithDetails();
  console.log(obj);
  res.locals.lcCategories = await categoryService.findAllWithDetails();
  res.locals.lcCatParent=await categoryService.findCatParent();
  res.locals.lcCat = await categoryService.findNotCatParent();
  next();
});

activate_session(app);
activate_locals(app);

app.get("/", async function (req, res) {
  const newest = await coursesService.findNewestCourses();
  const popula = await coursesService.findPopularCourses();
  const listP= await categoryService.findCatParent();
  
  
  
  console.log(popula);
  //console.log(req.session.auth);
  res.render("home", {
      newest: newest,
      popular: popula
  });
});

app.post("/", async function (req, res) {
  const a = req.body.rate;
  const b = req.body.comment;
  console.log(a);
  console.log(b);
  res.redirect("/");
});

app.use("/admin/categories", categoryRoute);
app.use("/admin/Courses", coursesRoute);
app.use("/courses", coursesUserService);
app.use("/account", accountRoute);
app.use("/teacher", teacherRoute);

app.use(function(req,res,next){
  
  res.render('404',{layout:false});
     
});
app.use(function(err,req,res,next){
    console.log(err.stack);
    res.render('500',{layout:false});
       
});
const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-commerce application listening at http://localhost:${PORT}`);
});
