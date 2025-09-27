import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  changeUserPassword,
  updateUserProfile,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/profile", protectRoute, updateUserProfile);
router.put("/change-password", protectRoute, changeUserPassword);

export default router;
