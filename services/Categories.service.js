import db from '../utils/db.js'

export default {
    async findMostEnrollCat(){
        const sql = `SELECT courses.CatID, COUNT(enroll.StudentID) as thecount
                    FROM enroll enroll, courses courses
                    WHERE enroll.CourID = courses.CourID
                    group by courses.CatID
                    order by thecount DESC`
        const ret = await db.raw(sql);
        return ret[0];
    }
}