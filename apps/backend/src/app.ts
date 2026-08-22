import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRouter from "./routes/index.route";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

//app.get("/", (req, res) => {
//    res.json({
//        status: "alive"
//    })
//})

app.use("/api/v1", indexRouter)

export default app;