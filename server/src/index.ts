import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";
import leadRoutes from "./routes/leadRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GigFlow API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});