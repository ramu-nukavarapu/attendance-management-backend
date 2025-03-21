import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
    regulation: {
        type: String,
        required: true
    },
    semester: [{
        type: Number,
        required: true
    }],
    startDate: [{
        type: Date,
        required: true
    }],
    endDate: [{
        type: Date,
        required: true
    }]
})

export const Semester = mongoose.model("Semester", semesterSchema)