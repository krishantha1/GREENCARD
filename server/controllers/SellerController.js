// Login Seller : /api/seller/login

import jwt from 'jsonwebtoken';

export const sellerLogin = async (req,res) =>
{

    const {email,password}  = req.body;

    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL)
    {
        const token = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn:'7d'});
       
        res.cookie('token',token,{
            httpOnly: true,  
            secure:process.env.NODE_ENV === 'production',


            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            //cfrf proct

            maxAge : 7 * 24 * 60 * 60 * 1000,
        })


        return res.json({success:true, message:"Logged In"})
    }

}