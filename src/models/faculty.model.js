import mongoose, { Schema } from "mongoose";

const facultySchema = new mongoose.Schema({
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
    subjects: [{
        subjectID: {
            type: Schema.Types.ObjectId,
            ref: "Subject"
        }
    }],
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
    
})

export const Faculty = mongoose.model("Faculty", facultySchema)