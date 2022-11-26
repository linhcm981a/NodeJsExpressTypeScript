import express from 'express';
import {  
    createAuthor,
    readAuthor,
    readAll,
    updateAuthor,
    deleteAuthor,
    ValidateJoi } from '../author/services';
import { Schemas } from '../author/validators';


const router = express.Router();

router.post('/create', ValidateJoi(Schemas.author.create), createAuthor);
router.get('/:authorId',readAuthor);
router.get('/',readAll);
router.patch('/:authorId', ValidateJoi(Schemas.author.update),updateAuthor);
router.delete('/:authorId',deleteAuthor);

export = router;
