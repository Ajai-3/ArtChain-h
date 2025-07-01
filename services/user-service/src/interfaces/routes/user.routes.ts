import express from "express";

import { refreshToken, loginUser, logoutUser, registerUser } from "../controllers/AuthController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/refresh-token", refreshToken)
router.post("/logout", logoutUser)

export default router;
