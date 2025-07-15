import express from "express"
import ArtWorkRouter from "./4-interfaces/routes/artwork.routes"
import { errorHandler } from "./4-interfaces/middleware/errorHandler"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log(`Incoming request: ${req.method} ${fullUrl}`);
  next();
});


app.use('/api/v1/art', ArtWorkRouter)

app.use(errorHandler)

export default app