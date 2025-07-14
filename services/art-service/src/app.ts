import express from "express"
import ArtWorkRouter from "./4-interfaces/routes/artwork.routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/artwork', ArtWorkRouter)


export default app