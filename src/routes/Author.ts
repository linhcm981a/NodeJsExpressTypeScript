import express from 'express';
import services from '../author/services';
import { Schemas } from '../author/validators';
import { ValidateJoi } from '../author/repo';


const router = express.Router();

router.post('/create', ValidateJoi(Schemas.author.create), services.createAuthor);
router.get('/:authorId', services.readAuthor);
router.get('/', services.readAll);
router.patch('/:authorId', ValidateJoi(Schemas.author.update), services.updateAuthor);
router.delete('/:authorId',services.deleteAuthor);

export = router;
