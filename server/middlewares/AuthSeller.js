import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    try {
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        
        // Check if the decoded email matches the seller's email
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            return next(); // Proceed to the next middleware
        } else {
            return res.status(401).json({ success: false, message: 'Not Authorized' });
        }
        
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authSeller;
