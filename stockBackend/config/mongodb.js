import mongoose from "mongoose";

function mongoDB(){

    mongoose.connection.on("connected",()=>{
        console.log("DB connented")
    });

    mongoose.connect(process.env.MongoDB_URL);
}

export default mongoDB