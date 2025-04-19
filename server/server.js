import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/UserRoute.js';
import sellerRouter from './routes/SellerRoutes.js';
import connectCloudinary from './configs/Coludinary.js';
import productRouter from './routes/ProductRoutes.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/OrderRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB

  await connectDB(); // ✅ Removed `await` from top-level (use in async function only)
  await connectCloudinary()
// Allowed origins
const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
