import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { errorHandling, pageNotFound } from "../middlewares/error.js";
import userRouter from "./../routers/user.js";
import crudRouter from "./../routers/crud.js";

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/produk", crudRouter);

app.use(pageNotFound);
app.use(errorHandling);
