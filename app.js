import express from 'express';
import { engine } from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections'
import coursesService from "./services/courses.service.js";
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));
app.engine('hbs', engine({
    // defaultLayout: 'main.hbs'
    extname: 'hbs',
    defaultLayout: 'bs4',
    helpers: {
        section: hbs_sections(),
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/',async function (req, res){
    const list = await coursesService.findNewestCourses();
    res.render('home', {
        newest: list
    });
});
app.post('/',  function (req,res){
    const a = req.body.rate;
    const b = req.body.comment;
    console.log(b)
    res.redirect('/');
})
const PORT = 3000;
app.listen(PORT, function () {
    console.log(`E-commerce application listening at http://localhost:${PORT}`);
})