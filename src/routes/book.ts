import { Router } from 'express';
import { deleteBook, getBook, getBooks, postBook, updateBook, lendBook } from '../controllers/book';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.delete('/:id', deleteBook);
router.post('/', postBook);
router.put('/:id', updateBook);
// Nueva ruta para prestar libros
router.put('/lend/:id', lendBook);
export default router;