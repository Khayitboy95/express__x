const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const books = require('./routes/books');
const home = require('./routes/home');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/api/books', books);
app.use('/', home);

console.log(config.get('mailserver'))

app.listen(5000, () => {
    console.log(`${PORT}chi portni eshitishni boshladim`);
})