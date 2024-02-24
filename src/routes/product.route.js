import express from 'express';
const router = express.Router();
import {addProduct,getProductByCategoryId,getProductById} from '../controllers/product.controller.js';

router.post('/', addProduct);
router.get('/category/:categoryId', getProductByCategoryId);
router.get('/:productId', getProductById);

export default router;