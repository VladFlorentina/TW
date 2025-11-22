const express = require('express')
const Book = require('./Book')

const app = express()
const port = 3000

const bookRouter = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', bookRouter)

let books = [
    new Book(1, "Dune", "sf", "Frank Herbert"),
    new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
    new Book(3, "Foundation", "sf", "Asimov")
]

bookRouter.route('/books/alphabetical')
    .get((req, res) => {
        let sortedBooks = books.slice();
        sortedBooks.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        res.json(sortedBooks);
    })

bookRouter.route('/books')
    .get((req, res) => {
        let filteredBooks = [];
        if (req.query.genre) {
            filteredBooks = books.filter(x => x.genre === req.query.genre)
        } else {
            filteredBooks = books;
        }
        res.json(filteredBooks);
    })
    .post((req, res) => {
        if (!req.body.id || !req.body.name || !req.body.genre || !req.body.author) {
            return res.status(400).json({ message: "Nu ai completat toate campurile (id, name, genre, author)!" });
        }

        const existingBook = books.find(b => b.id == req.body.id);
        if (existingBook) {
            return res.status(409).json({ message: "O carte cu acest ID exista deja." });
        }

        let newBook = new Book(req.body.id, req.body.name, req.body.genre, req.body.author);

        books.push(newBook);
        
        console.log("Carte adaugata:", newBook);
        return res.status(201).json(newBook);
    })

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.listen(port, () => {
    console.log('Running on the port ' + port)
})