import mongoose from "mongoose";
import Product from "../models/Product.js"; // ✅ correct relative path



const orderSchema = new mongoose.Schema({

    userId:{type: String, required: true,ref:'user'},
    items:[{
        product:{type:String , required:true,ref:'product'},
        quntity:{type:Number, required:true}
    }],

    amount:{type:Number, required:true},
    address:{type:String,required: true,ref:'address'},
    status:{type:String, default:'Order Placed'},
    paymentType:{type:String, required:true},
    isPaid:{type:Boolean, required:true,default:false},

},{timestamps:true})


const Order = mongoose.models.order || mongoose.model('order',orderSchema)

export default Order