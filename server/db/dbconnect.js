import { mongoose } from "mongoose";

export default async function dbconnect(){
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("db connected succesfully!!!");
    } catch (error) {
        console.log("error connecting to mongodb", error);
    }
}