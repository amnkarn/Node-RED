import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
dotenv.config({ path: "../../packages/db/.env" })

const DB_URL = process.env.DATABASE_URL;
if(!DB_URL) {
    throw Error("DB_URL is missing");
}

const adapter = new PrismaPg({ connectionString: DB_URL });
const prismaClient = new PrismaClient({ adapter });

export default prismaClient;