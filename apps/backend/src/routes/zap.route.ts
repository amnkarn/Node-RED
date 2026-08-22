import { Router } from "express";
import { ZapCreateSchema, ZapUpdateSchema } from "../types";
import prismaClient from "@repo/db/client";
import { authMiddleware } from "../middleware/authMiddleware";



const zapRouter: Router = Router();

zapRouter.post("/", authMiddleware, async (req, res) => {
    const { data, success } = ZapCreateSchema.safeParse(req.body);
    if(!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const id = req.user?.id;

    try {
        const zap = await prismaClient.$transaction(async tx => {
            const newZap = await tx.zap.create({
                data: {
                    userId: (id as string),
                    triggerId: "",
                    actions: {
                        create: data.actions.map((x, index) => ({
                            actionId: x.availableActionId,
                            metadata: x.actionMetaData,
                            sortingOrder: index
                        }))
                    }
                }
            })

            const trigger = await prismaClient.trigger.create({
                data: {
                    zapId: newZap.id,
                    triggerId: data.availableTriggerId,
                    metadata: data.triggerMetaData
                }
            })

            //update triggerId in zap
            const updateZap = await tx.zap.update({
                where: {
                    id: newZap.id,
                },
                data: {
                    triggerId: trigger.id
                }
            })

            return updateZap
        })

        return res.status(201).json({
            nessage: "Zap created succcessfully",
            zapId: zap.id
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
});

zapRouter.get("/", authMiddleware, async (req, res) => {
    const id = req.user?.id;

    try {
        const allZaps = await prismaClient.zap.findMany({
            where: {
                userId: id
            },
            include: {
                actions: {
                   include: {
                        type: true
                   }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        })
        
        return res.status(200).json(allZaps);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

zapRouter.get("/:zapId", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    const zapId = req.params.zapId;

    try {
        const zap = await prismaClient.zap.findFirst({
            where: {
                id: (zapId as string),
                userId: userId,
            }
        })
        if(!zap) {
            res.status(400).json({
                message: "Invalid zap id"
            })
        }

        return res.status(200).json(zap);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

zapRouter.put("/:zapId", authMiddleware, async (req, res) => {
    const { data, success } = ZapUpdateSchema.safeParse(req.body);
    if(!success) {
        return res.status(400).json({
            message: "Invalid inputs"
        })
    }

    const userId = req.user?.id;
    const zapId = req.params.zapId;

    try {
        const zap = await prismaClient.zap.findFirst({
            where: {
                id: (zapId as string),
                userId: userId,
            }
        })
        if(!zap) {
            res.status(400).json({
                message: "Zap not found or unauthorized"
            })
        }

        await prismaClient.$transaction(async tsx => {
            //need to update the triggeres
            if(data.availableTriggerId || data.triggerMetaData) {
                await tsx.trigger.update({
                    where: {
                        zapId: (zapId as string),
                    },
                    data: {
                        ...(data.availableTriggerId && {
                            triggerId: data.availableTriggerId,
                        }),
                        ...(data.triggerMetaData && {
                            metadata: data.triggerMetaData
                        })
                    }
                })
            }

            //delete prev actions, create new
            if(data.actions) {
                await tsx.action.deleteMany({
                    where: {
                        zapId: (zapId as string)
                    }
                })
                await tsx.action.createMany({
                    data: data.actions.map((act, index) => ({
                        zapId: (zapId as string),
                        actionId: act.availableActionId,
                        metadata: act.actionMetaData || {},
                        sortingOrder: index
                    }))
                })
            }

            return res.status(200).json({
                message: "Zap updated successfully",
                zapId
            })
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

export default zapRouter;