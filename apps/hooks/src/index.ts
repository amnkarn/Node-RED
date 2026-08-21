import express from "express";
import prismaClient from "@repo/db/client";

const app = express();

//hooks app work is to receive req from external service, and create ZapRun + ZapRunOutbox
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const { userId, zapId } = req.params;
    const metadata = req.body;

    //store in db a new trigger
    await prismaClient.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: JSON.parse(metadata)
            }
        });

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })

    res.status(200).json({
        message: "Webhook received"
    })
})