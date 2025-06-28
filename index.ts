import express from "express";

import bodyParser from "body-parser";

import morgan from "morgan";
import userRoutes from "./router/route";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: ["https://bd3a-2402-8100-26f4-dd36-62-9f72-7aa5-f367.ngrok-free.app","http://localhost:8080","https://cd3c-2402-8100-2735-b69b-e00e-3414-47db-c5b1.ngrok-free.app"]

}));


app.use(userRoutes);

app.listen(400,()=>{
    console.log("server running on port 400 !!")
})
