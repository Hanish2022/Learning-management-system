import express from "express"
import connetDB from "./database/dbConnect.js";
import dotenv from "dotenv"

dotenv.config({});//for accessing .env variables
connetDB()

const app = express()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})