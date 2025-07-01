import express from "express";
import userRouter from "../src/interfaces/routes/user.routes";


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/users", userRouter);


export default app;