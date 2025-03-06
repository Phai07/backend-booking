import express from "express";
import cors from "cors"
import connectDB from "./config/mongodb.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";


const app = express();
app.use(express.json());
app.use(cors());

 // เชื่อมต่อ MongoDB
connectDB();


//Routes api endpoints
app.use('/user', userRouter);
app.use('/bookings', bookingRouter);


//check if the server is running
app.get("/", (req, res) => {
  res.send("API Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
