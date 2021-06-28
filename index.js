const express = require('express');
const Joi = require('joi');
const app = express();
const PORT = process.env.PORT || 5000;
const helmet = require('helmet');
const morgan = require('morgan');

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

const books = [
    {id: 1, name: "rich dad poor dad"},
    {id: 2, name: "good to great"},
    {id: 3, name: "rework"}
];

app.get('/', (req, res) => {
    res.send('expres');
});

app.get('/api/books', (req, res) => {
    res.send(books);
});

app.post('/api/books', (req, res) => {

    const {error} = validateBook(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.status(201).send(book);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find( b => b.id === parseInt(req.params.id));
    if(!book){
        return res.status(404).send('Berilgan IDga teng bo\'lgan kitob topilmadi');
    }
    res.send(book);
});
 
app.put('/api/books/:id', (req, res) => {
    const book = books.find( b => b.id === parseInt(req.params.id));
    if(!book){
        return res.status(404).send('Berilgan IDga teng bo\'lgan kitob topilmadi');
    }

    const {error} = validateBook(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    
    book.name = req.body.name;
    res.send(book);
});

app.delete('/api/books/:id', (req, res) => {
    const book = books.find( b => b.id === parseInt(req.params.id));
    if(!book){
        return res.status(404).send('Berilgan IDga teng bo\'lgan kitob topilmadi');
    }
    const bookIndex = books.indexOf(book);
    books.splice(bookIndex, 1);
    res.send(book);
});

function validateBook(book){
    const bookSchema = Joi.object({
        name: Joi.string().required().min(3)
    });
    return bookSchema.validate(book);
}

app.listen(5000, () => {
    console.log(`${PORT}chi portni eshitishni boshladim`);
})