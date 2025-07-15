import express from "express"
import { fetchArtworks, postAnArtwork } from "../controllers/ArtController"
import { UserAuthMiddleware } from "../middleware/UserAuthMiddleware"
const router = express.Router()


router.get("/", fetchArtworks)
router.post("/", UserAuthMiddleware, postAnArtwork)

export default router