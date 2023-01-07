import express from "express";
import categoryService from "../services/category.service.js";
import adminRole from "../middlewares/adminRole.mdw.js";

const router = express.Router();

router.get("/add", adminRole, function (req, res) {
  res.render("vwCategory/add", { layout: "bs5.hbs" });
});

router.post("/add", async function (req, res) {
  const ret = await categoryService.add(req.body);
  res.redirect("/admin/categories/add");
});

router.get("/", adminRole, async function (req, res) {
  const list = await categoryService.findAll();
  res.render("vwCategory/index", {
    categories: list,
    empty: list.length === 0,
    layout: "bs5.hbs",
  });
});
router.get("/edit", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const category = await categoryService.findById(id);
  if (category === null) {
    return res.redirect("/admin/categories");
  }

  res.render("vwCategory/edit", {
    category: category,
    layout: "bs5.hbs",
  });
});

router.post("/del", adminRole, async function (req, res) {
  const id = req.query.id || 0;
  const affected_rows = await categoryService.del(id);
  res.redirect("/admin/categories");
});

router.post("/patch", adminRole, async function (req, res) {
  const affected_rows = await categoryService.patch(req.body);
  res.redirect("/admin/categories");
});
export default router;
