
import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config();
const connectDB = async () => {
    try {
       const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rn2eobo.mongodb.net/?appName=Cluster0`) ;
       console.log(`MongoDb Connected: ${conn.connection.host}`);
       console.log(`Database Name: ${conn.connection.name}`);
       
    } catch (error) {
        console.error(`Eroor: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
