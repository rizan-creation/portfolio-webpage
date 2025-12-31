import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./src/configs/database.config.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();
const app = express()
const port = process.env.PORT

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));

connectDB();
const PORT = process.env.PORT || 8000;
app.use("/api/v1", userRoutes)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});


