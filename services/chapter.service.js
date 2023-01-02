import db from "../utils/db.js";

export default {
    async findByCourID(id){
        return db("chapter").where("CourID",id).orderBy("ChapOrder");
    },

    async findSpecificOrderChapter(id, order){
        return db("chapter").where("ChapID",id)
    },
    async editChap(chapter,id){
        return db("chapter").where("ChapID",id).update(chapter);
    },
    async addNew(chapter){
        return db("chapter").insert(chapter);
    },
    async checkChapNull(id){
        return db("chapter").where("Link","").where("CourID",id).count("ChapID as quantity");
    },
    async del(id){
        return db("chapter").where("ChapID",id).del();
    }
}