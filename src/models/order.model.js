import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})


const orderSchema = new mongoose.Schema({
 orderPrice:{
    type:Number,
    required:true
 },
 userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
 },
 orderItems:[orderItemSchema],
 address:{
    type:String,
    required:true
 },
 status:{
    type:String,
    enum:['PENDING','CANCELLED','DELIVERED']
 }

},{timestamps:true});

export const Order = mongoose.model('Order', orderSchema);