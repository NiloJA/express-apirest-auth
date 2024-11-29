import mongoose from "mongoose";
import 'dotenv/config';


export const dbConnection = async () => {
    const uri = process.env.MONGO_URI;
    try {
        await mongoose.connect(uri);
        console.log('DB Online')
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inciar la BD ver Logs')
    }
}