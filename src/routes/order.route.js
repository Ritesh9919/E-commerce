import express from 'express';
const router = express.Router();
import {placeOrder,getOrderHistory,getOrderById} from '../controllers/order.controller.js';
import {varifyJwt} from '../middlewares/auth.middleware.js';

router.post('/',varifyJwt,placeOrder);
router.get('/',varifyJwt,getOrderHistory);
router.get('/:orderId', varifyJwt,getOrderById);

export default router;