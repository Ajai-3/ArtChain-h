import express from "express";
import cookieParser from 'cookie-parser';

import userRouter from "../src/interfaces/routes/user.routes";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/users", userRouter);


export default app;