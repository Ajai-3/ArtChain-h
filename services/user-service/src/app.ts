import express from "express";
import cookieParser from 'cookie-parser';

import userRouter from "../src/interfaces/routes/user.routes";
import adminRouter from "../src/interfaces/routes/admin.routes";


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


export default app;