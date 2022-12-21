import express from "express";
import categoryService from "../services/category.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const list = await categoryService.findAll();
  res.render("vwCategory/index", {
    categories: list,
    empty: list.length === 0,
    layout: 'bs5.hbs'
  });
});
export default router;
