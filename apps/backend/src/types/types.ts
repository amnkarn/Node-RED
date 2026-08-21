import { z } from "zod";

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