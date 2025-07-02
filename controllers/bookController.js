const { readData, writeData } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');
const BOOKS_FILE = './data/books.json';

exports.getAllBooks = async (req, res) => {
  const books = await readData(BOOKS_FILE);
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const books = await readData(BOOKS_FILE);
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const books = await readData(BOOKS_FILE);

  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.id
  };

  books.push(newBook);
  await writeData(BOOKS_FILE, books);
  res.status(201).json(newBook);
};

exports.updateBook = async (req, res) => {
  const books = await readData(BOOKS_FILE);
  const bookIndex = books.findIndex(b => b.id === req.params.id);

  if (bookIndex === -1 || books[bookIndex].userId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  await writeData(BOOKS_FILE, books);
  res.json(books[bookIndex]);
};

exports.deleteBook = async (req, res) => {
  const books = await readData(BOOKS_FILE);
  const bookIndex = books.findIndex(b => b.id === req.params.id);

  if (bookIndex === -1 || books[bookIndex].userId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  books.splice(bookIndex, 1);
  await writeData(BOOKS_FILE, books);
  res.json({ message: 'Book deleted' });
};