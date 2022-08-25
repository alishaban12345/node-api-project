import mongoose from "mongoose";
const Schema=mongoose.Schema;
const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    }
},{timestamps:true,versionKey:false});

const Product=mongoose.model('Product',productSchema);



export default Product ;