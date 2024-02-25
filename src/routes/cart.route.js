import express from 'express';
const router = express.Router();
import {addProductToCart,viewCart,updateQunatity,removeItemFromCart} from '../controllers/cart.controller.js';
import {varifyJwt} from '../middlewares/auth.middleware.js'

router.post('/',varifyJwt,addProductToCart);
router.get('/',varifyJwt,viewCart);
router.put('/',varifyJwt,updateQunatity);
router.delete('/:productId', varifyJwt, removeItemFromCart);

export default router;