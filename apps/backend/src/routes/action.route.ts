import prismaClient from "@repo/db/client";
import { Router } from "express";


const actionRouter: Router = Router();

actionRouter.get("/", (req, res) => {
    
});


actionRouter.get("/available", async (req, res) => {
    const allTriggeres = await prismaClient.availableAction.findMany({});
    res.status(200).json({allTriggeres})
});

export default actionRouter;