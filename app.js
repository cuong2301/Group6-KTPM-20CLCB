import express from "express";
import hbs_sections from "express-handlebars-sections";
import { engine } from "express-handlebars";

import { dirname } from "path";
import { fileURLToPath } from "url";

import numeral from "numeral";

import categoryRoute from "./routes/category.route.js";
import coursesService from "./services/courses.service.js";
import accountRoute from "./routes/account.route.js";
import coursesUserService from "./routes/courses-user.route.js";
import categoryService from "./services/category.service.js";

import coursesRoute from "./routes/courses.route.js";
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static("public"));

app.use("/account", accountRoute);
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
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(async function (req, res, next) {
  res.locals.lcCategories = await categoryService.findAllWithDetails();
  next();
});

app.get("/", async function (req, res) {
  const newest = await coursesService.findNewestCourses();
  const popula = await coursesService.findPopularCourses();
  res.render("home", {
      newest: newest,
      popular: popula
  });
});

app.post('/', function(req, res) { //your ajax should also post to url: '/'
    let score = req.body.score;
    console.log(score);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
    // ...
});

// app.post("/", async function (req, res) {
//   const a = req.body.rate;
//   const b = req.body.comment;
//   res.redirect("/");
// });

app.use("/admin/categories", categoryRoute);
app.use("/admin/Courses", coursesRoute);
app.use("/courses", coursesUserService);
app.use("/account", accountRoute);
const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-commerce application listening at http://localhost:${PORT}`);
});
