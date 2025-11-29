import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URI)
        console.log("✅ MongoDB connected");
        
    } catch (error) {
        console.log("❌ Connection to MongoDB errored", error);
        process.exit(1)
    }
}


export default connectDB


 