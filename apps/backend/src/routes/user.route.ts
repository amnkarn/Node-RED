import prismaClient from "@repo/db/client";
import { Router } from "express";
import crypto from "crypto";
import { client } from "@repo/redis/client";
import { sendOtpEmail } from "../utils/sendEmail";
import bcrypt from "bcrypt";
import { loginSchema } from "../types";
import { assignToken } from "../utils/assignToken";

const userRouter: Router = Router();

userRouter.post("/signup", async (req, res) => {
    const { email } = req.body;
    if(!email) {
        return res.status(400).json({
            message: "invalid inputs"
        })
    }

    try {
        const findUser = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        if(findUser) {
            return res.status(400).json({
                messasge: "already registered"
            })
        }

        const otp = crypto.randomInt(100000, 999999);

        //save in redis
        await client.set(`otp:${email}`, otp, {
            EX: 300
        });

        sendOtpEmail(email, otp);

        res.status(200).json({
            message: "Otp sent successfully to your email"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { success, data } = loginSchema.safeParse(req.body);
    if(!success) {
        return res.status(400).json({
            message: "Invalid input"
        })
    }

    try {
        const findUser = await prismaClient.user.findUnique({
            where: {
                email: data.email,
            }
        })
        if(!findUser) {
            return res.status(400).json({
                message: "User doesn't exits"
            })
        }

        const isValid = bcrypt.compare(data.password, findUser.password);
        if(!isValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        assignToken(res, findUser.id, findUser.email, process.env.USER_SECRET!);

        res.status(200).json({
            message: "Successfully loged in"
        })
        
    } catch (error) {
        console.log("Error in signin endpoint: ", error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

export default userRouter;