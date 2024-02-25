import {Order} from '../models/order.model.js';
import {Cart} from '../models/cart.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';
import {calculateTotalPrice} from '../utils/calculateTotalPrice.js';


const placeOrder = asyncHandler(async(req, res)=> {
     const {address} = req.body;
     if(!address) {
        throw new ApiError(400,'Address is required');
     }

     const cart = await Cart.findOne({userId:req.user._id}).populate('items.productId');
     
     if(!cart || cart.items.length == 0) {
     throw new ApiError(404, 'Cart is empty');
     }

     const totalOrderPrice = cart.items.reduce((total,item)=> {
        return total + (item.productId.price * item.quantity);
     },0)

     const order = new Order({
        userId:req.user._id,
        address,
        status:'PENDING',
        orderPrice:totalOrderPrice,
        orderItems:cart.items.map(item => ({ productId: item.productId._id, quantity: item.quantity }))
     })

     await order.save();


     // clear cart
     cart.items = []
     cart.totalPrice = 0
     await cart.save()

     return res.status(201)
     .json(new ApiResponse(200,order,'Order placed successfully'));





})



const getOrderHistory = asyncHandler(async(req, res)=> {
    const orders = await Order.find({userId:req.user._id});
    if(!orders) {
        throw new ApiError(404,'Orders does not exist');
    }

    return res.status(200)
    .json(new ApiResponse(200,orders,'Order history fetched successfully'));
})

const getOrderById = asyncHandler(async(req, res)=> {
    const {orderId} = req.params;
    const order = await Order.findById(orderId);
    if(!order) {
        throw new ApiError(404,'Order does not exist');
    }

    return res.status(200)
    .json(new ApiResponse(200,order,'Order fetched successfully'));
})



export {
    placeOrder,
    getOrderHistory,
    getOrderById
}