import db from "../utils/db.js";

export default {
  findAll() {
    return db("courses");
  },
  async countByCatId(catId) {
    const list = await db("courses")
      .where("CatID", catId)
      .count({ amount: "CourID" });

    return list[0].amount;
  },
  async findById(id) {
    const list = await db("courses").where("CourID", id);
    if (list.length === 0) return null;

    return list[0];
  },
  async findCourMostViews(id)
  {
    const Id=await db('courses').select('CatID').where('CourID',id);
    
    const list=await db('courses').where('CatID',+Id[0].CatID).whereNot('CourID',id).limit(5).orderBy('Views');
    if (list.length === 0) return null;

    return list;
  },

  findPageByCatId(catId, limit, offset) {
    return db("courses").where("CatID", catId).limit(limit).offset(offset);
  },

  async findNewestCourses() {
    return db("courses").limit(10).orderBy("dob", "desc");
  },

  async findPopularCourses(){
    const sql = `SELECT rated.CourID, courses.CourName, CONVERT(AVG(rated.Rating), float) as score
                 FROM coursesrating rated, courses
                 WHERE rated.CourID = courses.CourID
                 GROUP BY rated.CourID
                 ORDER BY score DESC
                 LIMIT 3`
    const ret = await db.raw(sql);
    return ret[0];
  },
  async searchByName(name){
    const ret =await db.raw( 'select  linhvuc.CatName , khoahoc.*  from categories as linhvuc, courses as khoahoc where linhvuc.CatID=khoahoc.CatID and match(linhvuc.CatName,khoahoc.CourName) against(? IN BOOLEAN MODE )',name);
    console.log(ret[0]);
    return ret[0];
  },

  async countsearch(name){
    const ret = await db.raw('select linhvuc.CatName,count(khoahoc.CourID) as CourCount from categories as linhvuc, courses as khoahoc where linhvuc.CatID=khoahoc.CatID and match(linhvuc.CatName,khoahoc.CourName) against(? IN BOOLEAN MODE ) group by linhvuc.CatName',name);
    console.log(ret[0]);
    return ret[0];
  },

  async increaseView(id){
    const list = await db("courses").where("CourID", id);
    return db("courses").where("CourID", id).update({Views: list[0].Views+1})
  },
  async addNew(course){
    return db("courses").insert(course);
  },
  async uptodate(course, id){
    return db('courses').where('CourID', id).update(course);
  }
};
