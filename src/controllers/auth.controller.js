import {User} from '../models/user.model.js';
import {ApiError,ApiResponse,asyncHandler} from '../utils/index.js';


const register = asyncHandler(async(req, res)=> {
     const {name,email,password} = req.body;
     if(!name || !email || !password) {
        throw new ApiError(400, 'All fields are required');
     }

     const isUserExist = await User.findOne({email});
     if(isUserExist) {
        throw new ApiError(409, 'User already exist');
     }

     const user = await User.create({
        name,
        email,
        password
     })

     const registerUser = await User.findById(user._id).select('-password');

     return res.status(201)
     .json(new ApiResponse(201,{user:registerUser},'User register successfully'));
})


const login = asyncHandler(async(req, res)=> {
   const {email,password} = req.body;
   if(!email || !password) {
      throw new ApiError(400,'Both fields are required');
   }

   const user = await User.findOne({email});
   if(!user) {
      throw new ApiError(404,'User does not exist');
   }

  
   const isPasswordCurrect = await user.isPasswordCurrect(password);
   if(!isPasswordCurrect) {
      throw new ApiError(401,'Invalid Credential');
   }

   const loggedInUser = await User.findById(user._id).select('-password');

   // generate token
   const accessToken = await user.generateAccessToken();

   return res.status(200)
   .cookie('accessToken',accessToken,{httpOnly:true})
   .json(new ApiResponse(200,{user:loggedInUser,accessToken},'User logged in successfully'));


})


export {
    register,
    login
}