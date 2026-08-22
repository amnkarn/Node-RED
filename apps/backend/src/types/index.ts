import { string, z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .max(50),
    email: z
        .string({error: "email required"})
        .trim()
        .email()
        .toLowerCase(),
    password: z
        .string()
        .min(3)
        .max(50),
    otp: z
        .string()
        .length(6)
})

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email()
        .toLowerCase(),
    password: z
        .string()
        .min(3)
        .max(50)
})

export interface JwtPayload {
    id: string,
    email: string,
}

export const ZapCreateSchema = z.object({
    //available Triggeres id
    availableTriggerId: z.string(),
    triggerMetaData: z.any().optional(),
    actions: z.array(
        z.object({
            availableActionId: z.string(),
            actionMetaData: z.any().optional(),
        })
    )
})

export const ZapUpdateSchema = z.object({
    availableTriggerId: z.string().optional(),
    triggerMetaData: z.any().optional(),
    actions: z.array(
        z.object({
            availableActionId: z.string(),
            actionMetaData: z.any().optional(),
        })
    ).optional()
})