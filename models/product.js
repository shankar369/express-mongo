const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    'product-name':{
        type:String,
        required:[true,'product-name field is required']
    },
    cost:{
        type:Number,
        required:[true,'cost field is required']
    },
    discount:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,'category field is required']
    },
    reviews:{
        type:Array,
        default:[]
    }
})


const Product = mongoose.model('products',ProductSchema);

module.exports = Product;