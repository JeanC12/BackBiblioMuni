"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_1 = require("../controllers/book");
const router = (0, express_1.Router)();
router.get('/', book_1.getBooks);
router.get('/:id', book_1.getBook);
router.delete('/:id', book_1.deleteBook);
router.post('/', book_1.postBook);
router.put('/:id', book_1.updateBook);
// Nueva ruta para prestar libros
router.put('/lend/:id', book_1.lendBook);
exports.default = router;
