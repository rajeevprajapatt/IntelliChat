import express from "express";
import morgan from "morgan";
import connect from "./db/db.js";

const app = express();

connect();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

export default app;