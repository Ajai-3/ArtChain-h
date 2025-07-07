import express from "express";
import cookieParser from 'cookie-parser';

import userRouter from "../src/4-interfaces/routes/user.routes";
import adminRouter from "../src/4-interfaces/routes/admin.routes";
import { errorHandler } from "../src/4-interfaces/middlewares/errorHandler";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  console.log(`Incoming request: ${req.method} ${fullUrl}`);
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter)

app.use(errorHandler)


export default app;