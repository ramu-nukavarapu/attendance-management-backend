import mongoose from "mongoose";
import env from "dotenv";

env.config()
const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Database connected!")
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}