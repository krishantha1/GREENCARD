import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("✅ Database Connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URL}/GreenCard`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
    }
};

export default connectDB;
