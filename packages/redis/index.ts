import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config({ path: "../../packages/redis/.env" });

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 15907;
if(!REDIS_HOST || !REDIS_PASSWORD) {
    throw Error("REDIS_HOST or REDIS_PASSWORD is missing");
}

export const client = createClient({
    username: 'default',
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
})

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Conteced!'));

async function connectRedis() {
    try {
        await client.connect();
    } catch (error) {
        console.log("Error in Redis: ", error);
    }
}

connectRedis();