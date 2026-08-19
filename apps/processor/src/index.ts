import prismaClient from "@repo/db/client";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
})

const TOPIC_NAME = "zap-events"

async function main() {
    const producer = kafka.producer();
    
    while(1) {
        const pendingRows = await prismaClient.zapRunOutbox.findMany({
            take: 10,
        });
        
        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => ({ value: r.zapRunId })),
        })
        
        await prismaClient.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(x => x.id)
                }
            }
        })
    }
}

main();