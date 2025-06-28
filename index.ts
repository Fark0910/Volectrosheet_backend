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
app.use(cors());


app.use(userRoutes);

app.listen(400, '0.0.0.0',()=>{
    console.log("server running on port 400 !!")
})
