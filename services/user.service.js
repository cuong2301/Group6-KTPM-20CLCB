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

  update(name, id) {
    return db("users").where("id", id).update({ username: name });
  },
};
