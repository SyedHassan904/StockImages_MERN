import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    provider:{
        type:String,
        default:"local"
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"image"
        }
    ],
    currency:{
        type:String,
        enum:['PKR','USD']
    },
    token:{
        type:String,
        default:""
    },
    profileURL:{
        type:String
    }
})

const userModel = mongoose.model.user || mongoose.model("user",userSchema);

export default userModel;
