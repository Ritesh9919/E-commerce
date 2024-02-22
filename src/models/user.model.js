import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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


userSchema.pre('save', async function() {
   if(!this.isModified('password')) return
   await bcrypt.hash(this.password, 10);
})


export const User = mongoose.model('User', userSchema);