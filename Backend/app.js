import express from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./routes/user-routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

connect();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
})

export default app;