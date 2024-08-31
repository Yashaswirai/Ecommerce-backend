const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],
    contact:{
        type:Number,
        default:910000000000,
    },
    picture:{
        type:Buffer,
        default:"/images/uploads/profile.jpg",
    },
});
module.exports = mongoose.model('user',userSchema);