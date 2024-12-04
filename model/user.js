import mongoose from "mongoose";
import validator from "validator";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    aliasEmail:{
        type:String,
        required:[true, "UserName required"],  
        unique:[true, "UserName already exists"],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [50, 'Username must be at most 50 characters']
    },
    email:{
        type:String,
        required: [true, 'Email is required'],
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
          }
    },
    password:{
        type:String,
    },
    position:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }
    ],

})


const User=mongoose.model('User',userSchema);

export default User;