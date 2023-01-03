import express from 'express';
import coursesService from "../services/courses.service.js";
import categoryService from "../services/category.service.js";
import chapterService from "../services/chapter.service.js";
import multer from 'multer';
import bcrypt from "bcryptjs";
import userService from "../services/user.service.js";

const router = express.Router();

let errormessage = "";

function requireRole () {
    return function (req, res, next) {
        console.log(req.session.authUser.permission);
        if (req.session.auth && req.session.authUser.permission == 0) {
            next();
        } else {
            res.render('404',{layout:false});
        }
    }
}

router.get('/profile', requireRole(), async function (req, res) {
    res.render('vwTeacher/teacher-profile',{
        message: errormessage,
        layout: 'bs6'
    });
    errormessage = "";
});

router.post('/profile', async function (req, res) {
    let newUser = req.body;
    const user = req.session.authUser;
    const auser = await userService.findById(user.id);
    errormessage = "";
    if (newUser.email != "") {
        const re =
            /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/;
        const email = newUser.email;
        console.log(1);
        if (re.test(email) === false) {
            console.log(4);
            errormessage = "Please fill correct email";
        }
    }
    if (newUser.OldPassword != "") {
        const check = bcrypt.compareSync(newUser.OldPassword, auser.password);
        console.log(2);
        if (!check) {
            console.log(3);
            errormessage = "Please confirm correct password";
        }
    }
    if(errormessage == "" && newUser.NewPassword != "" && newUser.OldPassword != ""){
        console.log(5);
        const rawPassword = newUser.NewPassword;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(rawPassword, salt);
        newUser.password = hash;
        errormessage = "Change successfully"
    }
    delete newUser.OldPassword;
    delete newUser.NewPassword;
    await userService.updateAll(user.id,newUser);
    req.session.authUser = await userService.findById(user.id);

    res.redirect("/teacher/profile")
});

router.get('/courses',requireRole(), async function (req, res) {
    const user = req.session.authUser
    const list = await coursesService.findByTeacherID(user.id);
    res.render('vwTeacher/teacher-courses',{
        product: list,
        empty: list.length === 0,
        layout: 'bs6'
    });
});
router.get("/courses/add",requireRole(),async function (req, res) {
    const list = await categoryService.findNotCatParent();
    res.render('vwTeacher/teacher-courses-add', {
        categories: list,
        layout: 'bs6'
    });
});
router.post('/courses/add', async function (req, res) {
    const next = await coursesService.getNextID();
    const nextID = next[0].AUTO_INCREMENT;
    const user = req.session.authUser
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
        course.TeacherID = user.id;
        await coursesService.addNew(course);
        if (err) {
            console.error(err);
        } else {
            res.redirect("/teacher/courses");
        }
    })
});
router.get("/courses/edit",requireRole(),async function (req, res) {
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
router.get("/courses/chapter",requireRole(), async function (req, res) {
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
router.get("/courses/chapter/edit",requireRole(), async function (req, res) {
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
router.get("/courses/chapter/add", requireRole(),async function (req, res) {
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