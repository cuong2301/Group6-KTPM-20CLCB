import db from "../utils/db.js";

export default {
  findAll() {
    return db("categories");
  },
  findNotCatParent(){
    return db("categories").where("CatParent",0);
  },
  async findMostEnrollCat() {
    const sql = `SELECT courses.CatID, COUNT(enroll.StudentID) as thecount
                    FROM enroll enroll, courses courses
                    WHERE enroll.CourID = courses.CourID
                    group by courses.CatID
                    order by thecount DESC`;
    const ret = await db.raw(sql);
    return ret[0];
  },
  async findById(id) {
    const list = await db("categories").where("CatID", id);
    if (list.length === 0) return null;

    return list[0];
  },
  async findAllWithDetails() {
    const sql = `	select c.*, count(p.CourID) as CourCount
    from categories c
           left join courses p on c.CatID = p.CatID
    group by c.CatID, c.CatName, c.CatParent`;
    const ret = await db.raw(sql);
    return ret[0];
  },
  async findCatParent()
  {

    return  await db('categories').where('CatParent',0);
  },
  async findNotCatParent()
  {
    return  await db('categories').whereNot('CatParent',0);
  },
  add(newCategory) {
    return db("categories").insert(newCategory);
  },

  del(id) {
    return db("categories").where("CatID", id).del();
  },

  patch(category) {
    const id = category.CatID;
    delete category.CatID;

    return db("categories").where("CatID", id).update(category);
  },
};
