import db from "../utils/db.js";

export default {
  findAll() {
    return db("categories");
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
    group by c.CatID, c.CatName`;
    const ret = await db.raw(sql);
    return ret[0];
  },
};
