import {Category} from '../models/category.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';



const addCategory = asyncHandler(async(req, res)=> {
     const {name} = req.body;
     if(!name) {
        throw new ApiError(400, 'Category name is required');
     }

     const category = await Category.create({name});
     return res.status(201)
     .json(new ApiResponse(200,category,'Category created successfully'));

})

const getCategories = asyncHandler(async(req,res)=> {
     const categories = await Category.find();
     if(!categories) {
        throw new ApiError(404,'Categories does not exist');
     }

     return res.status(200)
     .json(new ApiResponse(200,categories,'Categories fetched successfully'));
})


export {
    addCategory,
    getCategories
}