import mongoose, {Schema} from "mongoose";

const attendanceSchema = mongoose.Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    faculty: [{
        facultyID: {
            type: Schema.Types.ObjectId,
            ref: "Faculty",
            required: true
        },
        subjectID: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },
        period: {
            type: Number,
            required: true
        }
    }],
    periodStatus: [{
        period: {
            type: Number,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            enum: ["class", "lab"],
            required: true
        }
    }],
    presentHours: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true
    }
})

export const Attendance = mongoose.model("Attendance", attendanceSchema)