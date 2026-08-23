import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRouter from "./routes/index.route";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.startsWith("http://localhost:")) {
            return callback(null, true);
        }
        return callback(null, origin);
    },
    credentials: true,
}));
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