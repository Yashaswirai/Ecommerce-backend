const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,   
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],
    gstin:String,
    picture:{
        type:Buffer,
        default:"/images/uploads/profile.jpg",
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
});
module.exports = mongoose.model('owner',ownerSchema);