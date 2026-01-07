import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./src/configs/database.config.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();
const port = process.env.PORT;
const app = express()
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use("/api/v1", userRoutes);


connectDB();
const PORT = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

