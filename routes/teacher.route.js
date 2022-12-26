import express from 'express';
import coursesService from "../services/courses.service.js";
import categoryService from "../services/category.service.js";

const router = express.Router();


router.get('/profile', async function (req, res) {
    res.render('vwTeacher/teacher-profile',{
        layout: 'bs6'
    });
});

router.get('/courses', async function (req, res) {
    const list = await coursesService.findAll();
    res.render('vwTeacher/teacher-courses',{
        product: list,
        empty: list.length === 0,
        layout: 'bs6'
    });
});
router.get("/courses/add",async function (req, res) {
    const list = await categoryService.findAll();
    res.render('vwTeacher/teacher-courses-add', {
        categories: list,
        layout: 'bs6'
    });
});
router.post('/courses/add', async function (req, res) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy + '-' + mm + '-' + dd;
    let course = req.body;
    course.dob = formattedToday;
    course.update = formattedToday;
    await coursesService.addNew(course);
    console.log(course);
    res.redirect("/teacher/courses");
});
router.get("/courses/edit",async function (req, res) {
  const id = req.query.id || 0;
  const courses = await coursesService.findById(id);
  if (courses === null) {
    return res.redirect('/admin/categories');
  }
  res.render('vwTeacher/teacher-courses-edit', {
    courses: courses,
      layout: 'bs6'
  });
});

router.post("/courses/edit", async function (req, res) {
    const id = req.query.id || 0;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy + '-' + mm + '-' + dd;
    let bod = req.body;
    bod.update = formattedToday;
    await coursesService.uptodate(bod, id);
    res.redirect("/teacher/courses");
});

export default router;