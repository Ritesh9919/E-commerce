import express from 'express';
const router = express.Router();
import {addCategory,getCategories} from '../controllers/category.controller.js';

router.post('/',addCategory);
router.get('/', getCategories);
export default router;