import express from "express";
import coursesService from "../services/courses.service.js";
import adminRole from "../middlewares/adminRole.mdw.js";
const router = express.Router();

router.get("/byCat/:id", async function (req, res) {
  const catId = req.params.id || 0;

  for (let c of res.locals.lcCategories) {
    if (c.CatID === +catId) c.isActive = true;
  }

  const curPage = req.query.page || 1;
  const limit = 6;
  const offset = (curPage - 1) * limit;

  const total = await coursesService.countByCatId(catId);
  const nPages = Math.ceil(total / limit);

  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push({
      value: i,
      isCurrent: i === +curPage,
    });
  }

  const list = await coursesService.findPageByCatId(catId, limit, offset);
  res.render("vwCourses/byCat", {
    products: list,
    empty: list.length === 0,
    pageNumbers: pageNumbers,
  });
});

router.get("/",adminRole, async function (req, res) {
  const catId = req.query.catID || 0;
  const teacherId = req.query.teacherID || 0;
  console.log(catId);
  console.log(teacherId);
  let list;
  if(catId != 0 && teacherId != 0){
    list = await coursesService.findByTeacherIDAndByCat(catId,teacherId);
  } else if(catId != 0 && teacherId == 0){
    list = await coursesService.findByCatId(catId);
  } else if(catId == 0 && teacherId != 0){
    list = await coursesService.findByTeacherID(catId);
  } else {
    list = await coursesService.findAll();
  }
  res.render("vwCourses/index", {
    courses: list,
    empty: list.length === 0,
    layout: "bs5.hbs",
    CatID: catId,
    teacherId: teacherId
  });
});

// router.get("/", adminRole, async function (req, res) {
//   const catId = req.query.id || 0;
//   const teacherId = req.query.teacherID || 0;
//   let list;
//   if(catId != 0 && teacherId != 0){
//     list = await coursesService.findByTeacherIDAndByCat(catId,teacherId);
//   } else if(catId != 0 && teacherId == 0){
//     list = await coursesService.findByCatId(catId);
//   } else if(catId == 0 && teacherId != 0){
//     list = await coursesService.findByTeacherID(catId);
//   }
//   res.render("vwCourses/index", {
//     courses: list,
//     empty: list.length === 0,
//     layout: "bs5.hbs",
//   });
// });

router.get("/teacher/:id", adminRole, async function (req, res) {
  const teacherId = req.params.id || 0;
  const list = await coursesService.findByTeacherID(teacherId);
  res.render("vwCourses/index", {
    courses: list,
    empty: list.length === 0,
    layout: "bs5.hbs",
  });
});

router.post("/del", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await coursesService.del(id);
  res.redirect("/admin/Courses");
});

router.post("/block", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  let affected = await coursesService.findById(id);
  if(affected.block == 0){
    affected.block = 1;
  } else {
    affected.block = 0;
  }
  console.log(affected);
  await  coursesService.patch(affected);
  res.redirect("/admin/Courses");
});
export default router;
