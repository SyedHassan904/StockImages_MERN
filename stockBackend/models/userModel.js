import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    profileURL: {
        type: String
    },
    provider: {
        type: String,
        default: "local"
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "image"
        }
    ],
    currency: {
        type: String,
        enum: ['PKR', 'USD']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    downloadedImages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "image"
        }
    ]
})

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;