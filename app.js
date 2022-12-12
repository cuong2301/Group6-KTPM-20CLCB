import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
app.use(express.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));

app.engine('hbs', engine({
    // defaultLayout: 'main.hbs'
    extname: 'hbs',
    defaultLayout: 'bs4',
}))

