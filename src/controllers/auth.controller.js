import {User} from '../models/user.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';


const register = asyncHandler(async(req, res)=> {
     const {name,email,password} = req.body;
     if(!name || !email || !password) {
        throw new ApiError(400, 'All fields are required');
     }

     const isUserExist = await User.findOne({email});
     if(isUserExist) {
        throw new ApiError(400, 'User already exist');
     }

     const user = await User.create({
        name,
        email,
        password
     })

     return res.json(new ApiResponse(201,user,'user register successfully'));
})


export {
    register
}