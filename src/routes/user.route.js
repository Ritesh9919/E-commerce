import express from 'express';
const router = express.Router();
import {register,login} from '../controllers/auth.controller.js';
import {varifyJwt} from '../middlewares/auth.middleware.js'

router.post('/register', register);
router.post('/login', login);


export default router;