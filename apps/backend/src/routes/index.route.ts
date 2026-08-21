import { Router } from "express";
import userRouter from "./user.route";
import zapRouter from "./zap.route";
import triggerRouter from "./trigger.route";
import actionRouter from "./action.route";
import authRouter from "./auth.route";


const indexRouter: Router = Router();

indexRouter.use("/user", userRouter);

indexRouter.use("/auth", authRouter);

indexRouter.use("/zap", zapRouter);

indexRouter.use("/trigger", triggerRouter);

indexRouter.use("/action", actionRouter);

export default indexRouter;