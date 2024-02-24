import express from 'express';
const router = express.Router();
import {addProduct,getProductByCategoryId,getProductById} from '../controllers/product.controller.js';
import {varifyJwt} from '../middlewares/auth.middleware.js';

router.post('/', varifyJwt,addProduct);
router.get('/category/:categoryId', getProductByCategoryId);
router.get('/:productId', getProductById);

export default router;