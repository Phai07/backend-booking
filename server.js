import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000"
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes API endpoints
app.use("/user", userRouter);
app.use("/bookings", bookingRouter);

// Check if the server is running
app.get("/", (req, res) => {
  res.send("API Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
