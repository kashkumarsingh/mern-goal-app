import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import connectToDB from "./config/db.js";
import { goalRouter } from "./routes/goalRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
const app = express();

//Load environment variables from .env file
dotenv.config();

//Connect to MongoDB
connectToDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

//Routes
app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

//Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
