import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to TaskTrackr API");
});
app.use("/api/users", userRouter); // 👈 this must match
app.use("/api/tasks", taskRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the app for testing purposes
export default app;
