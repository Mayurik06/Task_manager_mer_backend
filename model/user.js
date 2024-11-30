import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
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
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Task'
        }
    ],
    leaves:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Leaves'
        }
    ]
})


const User=mongoose.model('User',userSchema);

export default User;