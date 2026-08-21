import prismaClient from "@repo/db/client";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
})

const TOPIC_NAME = "zap-events"

// worker work is to listen from kafka and do the work(like sending email)
async function main() {
    const consumer = kafka.consumer({
        groupId: "main-worker"
    });

    await consumer.connect();
    await consumer.subscribe({
        topic: TOPIC_NAME,
        fromBeginning: true,
    })

    while(1) {
        await consumer.run({
            eachMessage: async ({ partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value?.toString()
                })
            
                await new Promise(r => setTimeout(r, 500));

                const zapId = message.value?.toString();
                const nextAction = await prismaClient.action
            }
        })
    }
}

main();