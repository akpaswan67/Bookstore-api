const bookModel = require('../models/bookModel');
const { v4: uuidv4 } = require('uuid');

exports.getAllBooks = async (req, res) => {
  const books = await bookModel.getAllBooks();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const books = await bookModel.getAllBooks();
  if (!req.params.id) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const books = await bookModel.getAllBooks();

  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.id
  };

  books.push(newBook);

  // Save the new book to the file
  await bookModel.saveBooks(books);
  res.status(201).json(newBook);
};

exports.updateBook = async (req, res) => {
  const books = await bookModel.getAllBooks();

  const bookIndex = books.findIndex(b => b.id === req.params.id);
  if (bookIndex === -1 || books[bookIndex].userId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  await bookModel.saveBooks(books);
  res.json(books[bookIndex]);
};

exports.deleteBook = async (req, res) => {
  const books = await bookModel.getAllBooks();
  if (!req.params.id) {
    return res.status(400).json({ message: 'Book ID is required' });
  }
  const bookIndex = books.findIndex(b => b.id === req.params.id);

  if (bookIndex === -1 || books[bookIndex].userId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  books.splice(bookIndex, 1);
  await bookModel.saveBooks(books);
  res.json({ message: 'Book deleted' });
};