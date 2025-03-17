import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subjectID: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["general", "professional", "elective"],
        required: true
    },
    department: {
        type: String,
    },
    semester: {
        type: Number,
    }
})

export const Subject = mongoose.model("Subject", subjectSchema)