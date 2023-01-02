import express from 'express';
import coursesService from "../services/courses.service.js";
import categoryService from "../services/category.service.js";
import chapterService from "../services/chapter.service.js";
import { unlink } from 'node:fs';
import multer from 'multer';

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
    const list = await categoryService.findNotCatParent();
    res.render('vwTeacher/teacher-courses-add', {
        categories: list,
        layout: 'bs6'
    });
});
router.post('/courses/add', async function (req, res) {
    const next = await coursesService.getNextID();
    const nextID = next[0].AUTO_INCREMENT;
    console.log(nextID);
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/img');
        },
        filename: function (req, file, cb) {
            cb(null, nextID + ".jpg");
        }
    });
    const upload = multer({ storage: storage });
    upload.array('fuMain', 5)(req, res, async function (err) {
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
        if (err) {
            console.error(err);
        } else {
            res.redirect("/teacher/courses");
        }
    })
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
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/img');
        },
        filename: function (req, file, cb) {
            cb(null, id + ".jpg");
        }
    });
    const upload = multer({ storage: storage });
    upload.array('fuMain', 5)(req, res, async function (err) {
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
        course.CourID = id;
        await coursesService.patch(course);
        if (err) {
            console.error(err);
        } else {
            res.redirect("/teacher/courses");
        }
    })
});
router.get("/courses/chapter", async function (req, res) {
    const id = req.query.id || 0;
    const chap = await chapterService.findByCourID(id);
    const count = await chapterService.checkChapNull(id);
    let flag = false;
    if(count[0].quantity >= 1){
        flag = true;
    }
    console.log(flag);
    res.render("vwTeacher/teacher-courses-chapter",{
        chapter: chap,
        CourID: id,
        empty: chap.length === 0,
        layout: 'bs6',
        flag: flag
    })
});
router.get("/courses/chapter/edit", async function (req, res) {
    const id = req.query.id || 0;
    const CourId = req.query.CourID || 0;
    const chap = await chapterService.findSpecificOrderChapter(id);
    res.render("vwTeacher/teacher-courses-chapter-edit",{
        chapter: chap,
        CourID: id,
        empty: chap.length === 0,
        layout: 'bs6'
    })
});
router.post("/courses/chapter/edit", async function (req, res) {
    const id = req.query.id || 0;
    const CourID = req.query.CourID || 0;
    let chapter = req.body;
    await chapterService.editChap(chapter,id);
    res.redirect("/teacher/courses/chapter?id=" + CourID);
});
router.get("/courses/chapter/add", async function (req, res) {
    const id = req.query.id || 0;
    res.render("vwTeacher/teacher-courses-chapter-add",{
        CourID: id,
        layout: 'bs6'
    })
});
router.post("/courses/chapter/add", async function (req, res) {
    const id = req.query.id || 0;
    let chapter = req.body;
    chapter.CourID = id;
    await chapterService.addNew(chapter);
    res.redirect("/teacher/courses/chapter?id=" + id);
});
router.post("/courses/chapter/del", async function (req, res) {
    const id = req.query.id || 0;
    const CourID = req.query.CourID || 0;
    await chapterService.del(id);
    res.redirect("/teacher/courses/chapter?id=" + CourID);
});
export default router;