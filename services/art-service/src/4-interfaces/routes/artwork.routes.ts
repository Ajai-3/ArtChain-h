import express from "express"
import { ArtworkController } from "../controllers/ArtController"
const router = express.Router()

router.post("/", ArtworkController)

export default router