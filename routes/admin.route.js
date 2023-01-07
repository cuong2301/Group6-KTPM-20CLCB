import adminRole from "../middlewares/adminRole.mdw.js";
import userService from "../services/user.service.js";
import router from "./account.route.js";
import bcrypt from "bcryptjs";
import categoryService from "../services/category.service.js";
import coursesService from "../services/courses.service.js";
import isLogin from "../middlewares/isLogin.mdw.js";

router.get("/admin-login", isLogin, function (req, res) {
  res.render("vwAccount/loginAdmin", {
    layout: "bs5.hbs",
  });
});

router.post("/admin-login", async function (req, res) {
  const user = await userService.findByEmail(req.body.email);
  if (user === null) {
    return res.render("vwAccount/loginAdmin", {
      err_message: "Invalid username or password.",
    });
  }
  const ret = bcrypt.compareSync(req.body.password, user.password);
  if (ret === false) {
    return res.render("vwAccount/loginAdmin", {
      layout: "bs5.hbs",
      err_message: "Invalid username or password.",
    });
  }
  delete user.password;
  console.log(req.session.auth);
  if (user.permission == 0) {
    // 0 is admin
    req.session.auth = true;
    req.session.authUser = user;
    res.redirect("/admin/users");
  } else {
    return res.render("vwAccount/login", {
      err_message: "Your account is not admin",
    });
  }
});
router.get("/courses/:id", adminRole, async function (req, res) {
  const CourID = req.params.id || 0;
  const list = await userService.findByCourId(CourID);
  res.render("vwAccount/admin", {
    users: list,
    empty: list.length === 0,
    layout: "bs5.hbs",
  });
});

router.get("/teachers/add", adminRole, function (req, res) {
  res.render("vwTeacher/add-teacher", { layout: "bs5.hbs" });
});

router.post("/teachers/add", async function (req, res) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("123", salt);
  const user = {
    username: req.body.username,
    password: hash,
    email: req.body.tkuser,
    permission: 1,
    blocked: false,
  };
  const temp = await userService.findByEmail(req.body.tkuser);
  if (temp == null) {
    await userService.add(user);
    res.redirect("/admin/teachers/add");
  } else {
    res.render("vwTeacher/add-teacher", {
      layout: "bs5.hbs",
      err_message: "This email is existed",
    });
  }
});

router.get("/BigCategories", adminRole, async function (req, res) {
  let list = await categoryService.findCatParent();
  for (let i = 0; i < list.length; i++) {
    const a = await categoryService.countCourForBig(list[i].CatID);
    if (a.length == 0) {
      console.log(0);
      list[i].CourCount = 0;
    } else {
      list[i].CourCount = a[0].CourCount;
      console.log(1);
    }
  }
  console.log(list);
  res.render("vwCategory/admin_Big", {
    categories: list,
    empty: list.length === 0,
    layout: "bs5.hbs",
  });
});

router.get("/users", adminRole, async function (req, res) {
  const list = await userService.findStudent();
  res.render("vwAccount/admin", {
    users: list,
    empty: list.length === 0,
    layout: "bs5.hbs",
  });
});
router.get("/teachers", adminRole, async function (req, res) {
  const list = await userService.findTeacher();
  res.render("vwTeacher/admin-add-teacher", {
    users: list,
    empty: list.length === 0,
    layout: "bs5.hbs",
  });
});

router.get("/BigCategories/add", adminRole, function (req, res) {
  res.render("vwCategory/add_Big", { layout: "bs5.hbs" });
});

router.get("/BigCategories/edit", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const category = await categoryService.findByBigCatId(id);
  if (category === null) {
    return res.redirect("/admin/BigCategories");
  }

  res.render("vwCategory/edit_Big", {
    category: category,
    layout: "bs5.hbs",
  });
});

router.get("/teachers/add", adminRole, function (req, res) {
  res.render("vwTeacher/add-teacher");
});

router.post("/BigCategories/add", async function (req, res) {
  const ret = await categoryService.addBig(req.body);
  res.redirect("/admin/BigCategories/add");
});

router.post("/BigCategories/del", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await categoryService.delBig(id);
  res.redirect("/admin/BigCategories");
});

router.post("/BigCategories/patch", adminRole, async function (req, res) {
  const affected_rows = await categoryService.patchBig(req.body);
  res.redirect("/admin/BigCategories");
});

router.post("/admin-logout", async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;

  const url = "/admin/admin-login";
  res.redirect(url);
});

router.post("/teachers/del", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await userService.del(id);
  res.redirect("/admin/teachers");
});

router.post("/users/del", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await userService.del(id);
  res.redirect("/admin/users");
});

router.post("/teachers/disable", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await userService.disable(id);
  res.redirect("/admin/teachers");
});

router.post("/teachers/enable", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await userService.enable(id);
  res.redirect("/admin/teachers");
});

router.post("/users/disable", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await userService.disable(id);
  res.redirect("/admin/users");
});

router.post("/users/enable", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await userService.enable(id);
  res.redirect("/admin/users");
});

export default router;
