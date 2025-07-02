const { readData, writeData } = require('../utils/fileUtils');
const BOOKS_FILE = './data/books.json';

exports.getAllBooks = () => readData(BOOKS_FILE);

exports.saveBooks = (books) => writeData(BOOKS_FILE, books);
