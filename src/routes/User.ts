import express from 'express';
import services from '../user/services';
import {authJWT}  from '../services/auth';

const router = express.Router();

router.post('/register', services.register);
router.post('/login', services.login);
router.get('/validate', authJWT, services.validateToken);

export = router;
