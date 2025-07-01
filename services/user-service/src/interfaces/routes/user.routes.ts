import express from "express";
const router = express.Router();

import { registerUser } from "../controllers/UserController";

router.post("/register", registerUser);

export default router;
