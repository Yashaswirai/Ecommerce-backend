const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0,
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"owner",
    }
});
module.exports = mongoose.model('post',postSchema);