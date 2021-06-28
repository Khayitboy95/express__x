const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const books = [
    {id: 1, name: "rich dad poor dad"},
    {id: 2, name: "good to great"},
    {id: 3, name: "rework"}
]

app.get('/', (req, res) => {
    res.send('expres');
});

app.get('/api/books', (req, res) => {
    res.send(['rich dad poor dad', 'the war of art', 'good to great']);
});

app.post('/api/books', (req, res) => {
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
        res.status(404).send('Berilgan IDga teng bo\'lgan kitob topilmadi');
    }
    res.send(book);
});
 
app.get('/api/articles/:year/:month', (req, res) => {
    res.send(req.params);
});

app.listen(5000, () => {
    console.log(`${PORT}chi portni eshitishni boshladim`);
})