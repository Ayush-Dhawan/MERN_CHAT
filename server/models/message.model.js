import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //basically means this will be a user from User model (foreign key)
        required: true
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true}) //createdAt, updatedAt

const Message = mongoose.model("Message", messageSchema);

export default Message;
