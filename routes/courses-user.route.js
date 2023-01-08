import express from "express";
import coursesService from "../services/courses.service.js";
import userService from"../services/user.service.js";
import * as bodyParser from "express";

const router = express.Router();

router.get("/", async function (req, res) {
  const curPage = parseInt(req.query.page || 1);
  const limit = 6;
  const offset = (curPage - 1) * limit;
  const total = await coursesService.countAll();
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

router.get('/search', async function (req, res){
  console.log(req.session.Array.Array);
const ret= req.session.Search.Search;
  if(ret!=""){
    const product = await coursesService.searchByName(ret);
    const CourCount= await coursesService.countsearch(ret);
    if (product === null) {
      return res.redirect('/');
    }
    const catId = req.params.id || 0;
    for (let c of res.locals.lcCategories) {
      if (c.CatID === +catId) c.isActive = true;
    }
    const curPage = parseInt(req.query.page || 1);
    const limit = 6;
    const offset = (curPage - 1) * limit;
    const temp = await coursesService.counttotalsearch(ret);
    const total = temp[0].CourCount;
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
    let list = await coursesService.findPageByNameCourses(ret, limit, offset);
    if(req.session.Array.Array=="Price"){
       list = await coursesService.PriceArragerment(ret, limit, offset);
    }
    if(req.session.Array.Array=="Rating"){
       list = await coursesService.RateArragerment(ret, limit, offset);
    }
    res.render('vwCourses/search', {
      product: list,
      CourCount:CourCount,
      empty: list.length === 0,
      pageNumbers: pageNumbers
    });}
  else{
    res.render('vwCourses/search');
  }
});

router.post('/search', async function (req, res) {
  let ret=req.body.Search;
  req.session.Array={"Array":""};
  if(typeof ret === "undefined"){
    req.session.Array.Array=req.body.Array;
  }
  console.log(ret);
 if(ret!=null){
   req.session.Search=req.body;
  const product = await coursesService.searchByName(ret);
 const CourCount= await coursesService.countsearch(ret);
  if (product === null) {
    return res.redirect('/');
  }
   const catId = req.params.id || 0;
   for (let c of res.locals.lcCategories) {
     if (c.CatID === +catId) c.isActive = true;
   }
   const curPage = parseInt(req.query.page || 1);
   const limit = 6;
   const offset = (curPage - 1) * limit;
   const temp = await coursesService.counttotalsearch(ret);
   const total = temp[0].CourCount;
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
   const list = await coursesService.findPageByNameCourses(ret, limit, offset);
  res.render('vwCourses/search', {
    product: list,
    CourCount:CourCount,
    empty: list.length === 0,
    pageNumbers: pageNumbers
  });
 }
 else{
   const product = await coursesService.searchByName(req.session.Search.Search);
   const CourCount= await coursesService.countsearch(req.session.Search.Search);
   const catId = req.params.id || 0;
   for (let c of res.locals.lcCategories) {
     if (c.CatID === +catId) c.isActive = true;
   }
   const curPage = parseInt(req.query.page || 1);
   const limit = 6;
   const offset = (curPage - 1) * limit;
   const temp = await coursesService.counttotalsearch(req.session.Search.Search);
   const total = temp[0].CourCount;
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
   let list = await coursesService.findPageByNameCourses(req.session.Search.Search, limit, offset);
   if(req.session.Array.Array=="Price"){
      list = await coursesService.PriceArragerment(req.session.Search.Search, limit, offset);
     console.log(list);
   }
   if(req.session.Array.Array=="Rating"){
      list = await coursesService.RateArragerment(req.session.Search.Search, limit, offset);
     console.log(list);
   }
   console.log(req.session.Array.Array);

   res.render('vwCourses/search', {
     product: list,
     CourCount:CourCount,
     empty: list.length === 0,
     pageNumbers: pageNumbers
   });
 }
});

router.get('/detail/:id', async function (req, res) {
  const proId = req.params.id || 0;
  const user = req.session.authUser;
  const product = await coursesService.findById(proId);
  const listMost=await coursesService.findCourMostViews(proId);
  await coursesService.increaseView(proId);
  const chap=await coursesService.chapter(proId);
  const rating=await coursesService.ratingCourses(proId);
  const teacherId=product.TeacherID; 
  const teacher=await userService.findById(teacherId);
  const rev=await coursesService.review(proId);
  let flag;
  if(user == null){

  } else {
   flag = await coursesService.checkEnroll(proId,user.id);
  }
  console.log(req.session.auth);
  
  if (product === null) {

    return res.redirect('/');
  }

  res.render('vwCourses/detail', {
    product: product,
    listMost,
    chap,
    rating,
    teacher,
    rev,
    flag,
  });
});

router.post('/add', async function (req, res) {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = yyyy + '-' + mm + '-' + dd;
 
  const user = req.session.auth;
  let ret=null;
  
  req.body.dob=formattedToday;
  if(user){
   ret= await coursesService.addEnroll(req.body);
  res.render('vwCourses/add',{
    ret:ret,
    layout: false,
  });

  }else{
    res.redirect("/account/login");
  }
});

router.post('/comment', async function (req, res) {

  console.log(req.body)
  const id = req.body.CourID;
  const c=await coursesService.addFB(req.body);
  const rating=await coursesService.ratingCourses(id);
  await coursesService.patch({CourID: id ,score: rating.rate});
  return res.redirect('/courses/detail/' + req.body.CourID)
  


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
