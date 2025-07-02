const express = require('express');
const {
  getAllBooks, getBookById, createBook, updateBook, deleteBook, searchBooksByGenre
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Search books by genre
router.get('/search', searchBooksByGenre);

router.use(authMiddleware);

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;