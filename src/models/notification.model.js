import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
    senderID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    senderRole: {
        type: String,
        enum: ["admin", "faculty"],
        required: true
    },
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    recipientRole: {
        type: String,
        enum: ["student", "faculty"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isBroadcast: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Notification = mongoose.model("Notification", notificationSchema);
