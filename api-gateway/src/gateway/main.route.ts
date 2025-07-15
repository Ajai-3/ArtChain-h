import Router from "express"
import { userProxy, adminProxy } from "./services/main.proxy"

const router = Router()

router.use("/", userProxy)
router.use("/", adminProxy)

export default router