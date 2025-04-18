import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/UserRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB(); // ✅ Removed `await` from top-level (use in async function only)

// Allowed origins
const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter)


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
