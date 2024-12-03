var express = require("express");
let Books = require('./BooksSchema'); // Ensure the correct case for the file name
let mongodbConnected = require('./MongoDBConnect'); // Proper variable naming
const cors = require('cors');
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

console.log("BOOKS", Books);

// Home route
app.get('/', function (req, res) {
    res.send("Welcome to the Online Library API");
});

// About route
app.get('/about', function (req, res) {
    res.send("MongoDB, Express, React, and Mongoose app. React runs in another application.");
    Books.countDocuments().exec()
        .then(count => {
            console.log("Total documents count before addition:", count);
        })
        .catch(err => {
            console.error(err);
        });
});

// Get all books
app.get('/allbooks', function (req, res) {
    Books.find(function (err, allBooks) {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching books');
        } else {
            res.json(allBooks);
        }
    });
});

// Get a single book by ID
app.get('/getbook/:id', function (req, res) {
    let id = req.params.id;
    Books.findById(id, function (err, book) {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching the book');
        } else {
            res.json(book);
        }
    });
});

// Add a new book
app.post('/addbooks', function (req, res) {
    console.log("Request Body:", req.body);
    let newBook = new Books(req.body);
    console.log("New Book:", newBook);

    newBook.save()
        .then(book => {
            res.status(200).json({ 'books': 'Book added successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(400).send('Adding new book failed');
        });
});

// Update an existing book
app.post('/updatebook/:id', function (req, res) {
    let id = req.params.id;
    let updatedBook = req.body;

    console.log("Update ID:", id, "Updated Book:", updatedBook);

    Books.findByIdAndUpdate(id, {
        booktitle: updatedBook.booktitle,
        PubYear: updatedBook.PubYear,
        author: updatedBook.author,
        Topic: updatedBook.Topic,
        format: updatedBook.format
    }, function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating book');
        } else {
            res.status(200).json({ 'books': 'Book updated successfully' });
        }
    });
});

// Delete a book
app.post('/deleteBook/:id', function (req, res) {
    let id = req.params.id;

    console.log("Deleting book with ID:", id);

    Books.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).send('Error deleting book');
        } else {
            res.status(200).send('Book deleted successfully');
        }
    });
});

// Start the server
app.listen(500, function () {
    console.log("Server is running on port 500");
});
