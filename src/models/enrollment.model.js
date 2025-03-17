import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
        unique: true
    },
    subjects: [{
        subjectID: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        }
    }]
});

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
