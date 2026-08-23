import { Router, type Request, type Response } from "express";
import { registerSchema } from "../types";
import { client } from "@repo/redis/client";
import bcrypt from "bcrypt";
import prismaClient from "@repo/db/client";
import { assignToken } from "../utils/assignToken";

const authRouter: Router = Router();

authRouter.post("/verify-otp", async (req: Request, res: Response) => {
    const { success, data } = registerSchema.safeParse(req.body);
    console.log(data);
    if(!success) {
        return res.status(400).json({
            message: "Invalid inputs"
        })
    }

    try {
        const { name, email, password, otp } = data;
        
        //verify user is not registered
        const found = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
        if(found) {
            return res.status(400).json({
                message: "User is already registered",
            })
        }

        //check otp
        const storedOtp = await client.get(`otp:${email}`);
        if(!storedOtp) {
            return res.status(400).json({
                message: "OTP has expired. Please request a new one."
            })
        }
    
        if(otp.toString() !== storedOtp) {
            return res.status(400).json({
                message: "Invalid otp"
            })
        }

        await client.del(`otp:${email}`);
    
        const salt = await bcrypt.genSalt(6);
        const hash = await bcrypt.hash(password, salt);
    
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: hash,
            }
        })
        console.log("after db call");
        
        const secret = process.env.USER_SECRET!;
        assignToken(res, user.id, user.email, secret);
    
        res.status(201).json({
            message: "successefully signedup"
        })
        
    } catch (error) {
        console.log("Error is verify endpoin: ", error);
        res.status(500).json({
            message: "Something went wrong during verification"
        })
    }
})

export default authRouter;