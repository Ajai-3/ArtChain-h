import Router from "express"
import { userProxy, adminProxy } from "./services/main.proxy"

const router = Router()

console.log("hello")

router.use("/", userProxy)
router.use("/", adminProxy)

export default router