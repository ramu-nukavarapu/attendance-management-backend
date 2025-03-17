import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
    
})

export const Admin = mongoose.model("Admin", adminSchema)