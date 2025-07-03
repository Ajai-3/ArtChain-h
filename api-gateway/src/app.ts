import cors from "cors";
import express from "express";
import cookeParser from "cookie-parser";
import mainRoute from "../src/routes/main.route";
import { rateLimiter } from "./middleware/RateLimiter";

const app = express();


app.use(cookeParser());
app.use(rateLimiter);

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
    ],
    credentials: true,
  })
);

app.use("/api/v1", mainRoute);

export default app;
