import cors from "cors";
import express from "express";
import cookeParser from "cookie-parser";
import mainRoute from "./gateway/main.route";
import { rateLimiter } from "./middleware/RateLimiter";
import { config } from "./config/env";

const app = express();

app.use(cookeParser());
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use(
  cors({
    origin: config.frontend_url,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
    ],
    credentials: true,
  })
);


app.use("/", mainRoute);

export default app;
