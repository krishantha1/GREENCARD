import {v2 as cloudinary} from "cloudinary"
import product from "../models/Product.js"

// Add Product  : /api/product/add
export const addProduct = async (req,res) =>{

    try{
       
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,
                    {resource_type:'image'}
                );
                return result.secure_url
            })
        )

        await product.create({...productData, image:imagesUrl})
        res.json({success:true, message:"Product Added"})
    }
    catch(error){
          console.log(error.message);
          res.json({success:false, message:error.message})
    }
    


}


// get Product  : /api/product/list
export const productList = async (req,res) =>{


    try{
        const products = await product.find({})
       res.json({success: true,products})
    }catch(error){
       console.log(error.message);
       res.json({success : false,message:error.message})

    }
}


// get singaleProduct  : /api/product/id
export const productByIdt = async (req,res) =>{
   try{
      const {id} = res.body
      const product = await product.findById(id)
      res.json({success: true,product})
   }
   catch (error){
    console.log(error.message);
    res.json({success : false,message:error.message})
   }



}


// change  Product  : /api/product/stock
export const changeStock = async (req,res) =>{


    try{
      const {id,inStock} = req.body
      await product.findByIdAndUpdate(id,{inStock})
      res.json({success: true, message:"Stock Updated"})
    }catch (error){
        console.log(error.message);
        res.json({success : false,message:error.message})
       }

}