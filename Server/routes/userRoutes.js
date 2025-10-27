import express from "express";
import { registerUser, verifyOtp,saveUserDetails , getAllUsers} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/details", saveUserDetails);
router.get("/", getAllUsers);

export default router;
