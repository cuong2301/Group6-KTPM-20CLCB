import db from '../utils/db.js'

export default {
    async findNewestCourses(){
        return db('courses').limit(10).orderBy('dob','desc');
    }
}