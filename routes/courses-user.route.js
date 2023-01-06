import express from "express";
import coursesService from "../services/courses.service.js";
import * as bodyParser from "express";

const router = express.Router();

router.get("/", async function (req, res) {
  const curPage = parseInt(req.query.page || 1);
  const limit = 6;
  const offset = (curPage - 1) * limit;

  const total = await coursesService.countAll();
  console.log(total);
  const nPages = Math.ceil(total / limit);

  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push({
      value: i,
      isCurrent: i === +curPage,
      isCurPage:curPage,
      nPages,
    });
  }

  const list = await coursesService.findPageAll(limit, offset);
  res.render("vwCourses/byCat", {
    courses: list,
    empty: list.length === 0,
    pageNumbers: pageNumbers,
  });
});

router.get("/byCat/:id", async function (req, res) {
  const catId = req.params.id || 0;

  for (let c of res.locals.lcCategories) {
    if (c.CatID === +catId) c.isActive = true;
  }

  const curPage = parseInt(req.query.page || 1);
  const limit = 6;
  const offset = (curPage - 1) * limit;

  const total = await coursesService.countByCatId(catId);
  const nPages = Math.ceil(total / limit);
  
  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push({
      value: i,
      isCurrent: i === +curPage,
      isCurPage:curPage,
      nPages,
    });
  }

  const list = await coursesService.findPageByCatId(catId, limit, offset);
  res.render("vwCourses/byCat", {
    courses: list,
    empty: list.length === 0,
    pageNumbers: pageNumbers,
  });
});

router.get('/search',async function (req,res){
  res.render('vwCourses/search');
});

router.post('/search', async function (req, res) {
  const ret=req.body.Search;
  console.log(ret);
  console.log(req.body);
  const product = await coursesService.searchByName(ret);
const CourCount= await coursesService.countsearch(ret);
  if (product === null) {
    return res.redirect('/');
  }
  res.render('vwCourses/search', {
    product: product,
    CourCount:CourCount
  });

});

router.get('/detail/:id', async function (req, res) {
  const proId = req.params.id || 0;
  const product = await coursesService.findById(proId);
  const listMost=await coursesService.findCourMostViews(proId);
  await coursesService.increaseView(proId);
  if (product === null) {
    return res.redirect('/');
  }

  res.render('vwCourses/detail', {
    product: product,
    listMost
  });
});

router.post('/detail/:id', async function (req, res) {
  const proId = req.params.id || 0;
  const product = await coursesService.findById(proId);



  let wishlist = {
    StudentID :req.session.authUser.id,
    CourID :req.params.id
  };
  let studentcourses={
    CourID :req.params.id,
    StudentID :req.session.authUser.id,
  }

  if(typeof  req.body.like!=="undefined"){
    let check = await coursesService.findwishcourses(req.body.like);
      if(check==""){
        await coursesService.addwishcourses(wishlist);
      }
  }

  if(typeof  req.body.buy!=="undefined"){
    let check = await coursesService.findstudentcourses(req.body.buy);
    if(check==""){
      await coursesService.addstudentcourses(studentcourses);
    }
  }


  if (product === null) {
    return res.redirect('/');
  }

  res.render('vwCourses/detail', {
    product: product
  });

});


export default router;
