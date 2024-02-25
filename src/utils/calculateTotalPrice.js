import { Product } from "../models/product.model.js"
import { ApiError } from "./ApiError.js";


export const calculateTotalPrice = async(items)=> {
    try {
        let totalPrice = 0;
        for(const item of items) {
            const product = await Product.findById(item.productId);
            if(product) {
                totalPrice += product.price * item.quantity;
            }else{
               throw new ApiError(400,'Product does not exist');
            }
        }
        return totalPrice;
    } catch (error) {
        throw new ApiError(500,'Error calculating total price');
    }

}