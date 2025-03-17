import mongoose, { Schema } from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
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
    regdNo: {
        type: String,
        required: true,
        unique: true
    },
    regulation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    enrollmentID: {
        type: Schema.Types.ObjectId,
        ref: "Enrollment",
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
    
})

export const Student = mongoose.model("Student", studentSchema)