import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    imageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "image",
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    currency: {
        type: String,
        enum: ['USD', 'PKR']
    },
    status: {
        type: String,
        enum: ['paid', 'failed']
    },
    transactionID: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const paymemtModel = mongoose.model.payment || mongoose.model("payment",paymentSchema);

export default paymemtModel;