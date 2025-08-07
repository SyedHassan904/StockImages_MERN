import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category:{
        type:String
    },
    tags: [String],

    fileUrl: {
        type: String
    },
    waterMarkedURL:{
        type:String
    },
    pricePKR: {
        type: Number
    },
    priceUSD: {
        type: String
    },
    stats: {
        impressions: {
            type: Number,
            default: 0
        },
        clicks: {
            type: Number,
            default: 0
        },
        downloads: {
            type: Number,
            default: 0
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

},{ timestamps: true })


const imageModel = mongoose.model.image || mongoose.model("image",imageSchema);

export default imageModel;