import {isValidObjectId} from 'mongoose';
import {Product} from '../models/product.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';


const addProduct = asyncHandler(async(req, res)=> {
     const {name,description,price,category,inStock} = req.body;
     if(!name || !description || !price || !category) {
        throw new ApiError(400,'All fields are required');
     }

     const product = await Product.create({
        name,
        description,
        price,
        inStock,
        category,
        owner:req.user._id
     })

     return res.status(201)
     .json(new ApiResponse(200,product,'Product added successfully'));

})

const getProductByCategoryId = asyncHandler(async(req, res)=> {
     const {categoryId} = req.params;
     if(!isValidObjectId(categoryId)) {
        throw new ApiError(400,'Invalid category id');
     }

     const product = await Product.find({category:categoryId});
     if(!product) {
        throw new ApiError(404,'Product does not exist');
     }

     return res.status(200)
     .json(new ApiResponse(200,product,'Product fetched successfully'));

})


const getProductById = asyncHandler(async(req, res)=> {
     const {productId} = req.params;
     if(!isValidObjectId(productId)) {
        throw new ApiError(400,'Invalid product id');
     }

     const product = await Product.findById(productId);
     if(!product) {
        throw new ApiError(404,'Product does not exist');
     }

     return res.status(200)
     .json(new ApiResponse(200,product,'Product fetched successfully'));
})


export {
    addProduct,
    getProductByCategoryId,
    getProductById

}