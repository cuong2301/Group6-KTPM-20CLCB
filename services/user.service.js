import db from "../utils/db.js";

export default {
  findAll() {
    return db("users");
  },

  async findByCourId(id) {
    const sql = `	SELECT u.*
    From enroll e
    Join users u
    On e.studentId=u.id
    Where e.CourID =${id} `;
    const ret = await db.raw(sql);
    return ret[0];
  },
  async findTeacher(){
    const sql = `	SELECT *
    From users u
    Where u.permission =${1} `
    const list = await db.raw(sql);
    return list[0];
    // const list = await db("users").where("permission", "1");
    // if (list.length === 0) return null;
    // return list[0];
  },
  async findStudent(){
    const sql = `	SELECT *
    From users u
    Where u.permission =${2} `
    const list = await db.raw(sql);
    return list[0];
    // const list = await db("users").where("permission", "1");
    // if (list.length === 0) return null;
    // return list[0];
  },
  async addTeacher(user){
    return db("users").insert(user)
  },

  async findById(id) {
    const list = await db("users").where("id", id);
    if (list.length === 0) return null;

    return list[0];
  },

  async findByUsername(username) {
    const list = await db("users").where("username", username);
    if (list.length === 0) return null;

    return list[0];
  },


  async findByEmail(email) {
    const list = await db("users").where("email", email);
    if (list.length === 0) return null;
    return list[0];
  },

  add(user) {
    return db("users").insert(user);
  },

  del(id) {
    return db("users").where("id", id).del();
  },

  patch(user) {
    const id = user.id;
    delete user.id;

    return db("users").where("id", id).update(user);
  },
  findwishcourses(id) {
    return db("wishcourses").where("StudentID", id);
  },
  findenroll(id) {
    return db("enroll").where("StudentID", id);
  },
  update(name, id) {
    return db("users").where("id", id).update({ username: name });
  },
 deleteWish(studentid,courid){
   return  db("wishcourses").where("StudentID",studentid).where("CourID",courid).del();
  },
  updateAll(id,user){
    return db("users").where("id", id).update(user);
  },
  disable(id){
    return db('users').where( "id", id ).update({ blocked: true })
  },
  enable(id){
    return db('users').where( "id", id ).update({ blocked: false })
  },
};
