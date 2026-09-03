import prismaClient from "@repo/db/client";
import { Router } from "express";


const triggerRouter: Router = Router();

triggerRouter.get("/", (req, res) => {
    
});

triggerRouter.get("/available", async (req, res) => {
    const allTriggeres = await prismaClient.availableTrigger.findMany({});
    res.status(200).json({allTriggeres})
});

export default triggerRouter;