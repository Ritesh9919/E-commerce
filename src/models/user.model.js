import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   name:{
    type:String,
   },
   email:{
    type:String,
    required:[true,'most provide email'],
    unique:true
   },
   password:{
    type:String,
    required:[true,'most provide password']
   }
},{timestamps:true});


export const User = mongoose.model('User', userSchema);