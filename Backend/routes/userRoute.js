import express from "express";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  updatePassword,
} from "../controller/userController.js";

import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// Route to register a new user
//PUBLIC LINKS
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//PRIVATE LINKS protect also
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.get("/profile", authMiddleware, (req, res) => {
  res.send("User Profile");
});
userRouter.put("/password", authMiddleware, updatePassword);
export default userRouter;
