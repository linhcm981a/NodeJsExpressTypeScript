import express from 'express';
import services from '../book/services';
import { Schemas } from '../book/validators';
import { ValidateJoi } from '../book/repo';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.book.create),services.createBook);
router.get('/:bookId',services.readBook);
router.get('/',services.readAll);
router.patch('/:bookId', ValidateJoi(Schemas.book.update),services.updateBook);
router.delete('/:bookId',services.deleteBook);

export = router;
