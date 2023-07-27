import mongoose from "mongoose";
import configKeys from "../../../config";

const mongoUrl = configKeys.MONGODB_URL;

mongoose.set( "strictQuery", true )
const connectDB = async() => {
    try {
        await mongoose.connect( mongoUrl );
        console.log("Database connected successfully....");
    } catch (error) {
        console.log("Connection failed ....", error);
    }
}

export default connectDB;