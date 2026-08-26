import prismaClient from "../index";

async function main() {
    console.log("Seeding database with dummy data...");

    // 1. Create or find dummy user
    const dummyUser = await prismaClient.user.upsert({
        where: { email: "dummy@example.com" },
        update: {},
        create: {
            name: "Dummy User",
            email: "dummy@example.com",
            password: "password123", // dummy password
        },
    });

    console.log(`User created/found: ${dummyUser.id} (${dummyUser.email})`);

    // 2. Create Available Triggers
    const webhookTrigger = await prismaClient.availableTrigger.upsert({
        where: { name: "Webhook" },
        update: {},
        create: {
            name: "Webhook",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ31-eWd_nI1fW3R-Wb8c1t0zN2_n_u0p1wBg&s",
        },
    });

    const githubTrigger = await prismaClient.availableTrigger.upsert({
        where: { name: "GitHub" },
        update: {},
        create: {
            name: "GitHub",
            image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
    });

    const solanaTrigger = await prismaClient.availableTrigger.upsert({
        where: { name: "Solana Transaction" },
        update: {},
        create: {
            name: "Solana Transaction",
            image: "https://solana.com/favicon.ico",
        },
    });

    console.log("Available Triggers seeded.");

    // 3. Create Available Actions
    const emailAction = await prismaClient.availableAction.create({
        data: {
            name: "Send Email",
            image: "https://mail.google.com/favicon.ico",
        },
    }).catch(async () => {
        return await prismaClient.availableAction.findFirstOrThrow({
            where: { name: "Send Email" },
        });
    });

    const solanaAction = await prismaClient.availableAction.create({
        data: {
            name: "Send Solana",
            image: "https://solana.com/favicon.ico",
        },
    }).catch(async () => {
        return await prismaClient.availableAction.findFirstOrThrow({
            where: { name: "Send Solana" },
        });
    });

    const slackAction = await prismaClient.availableAction.create({
        data: {
            name: "Send Slack Message",
            image: "https://a.slack-edge.com/80588/marketing/img/meta/slack_logo_2400.png",
        },
    }).catch(async () => {
        return await prismaClient.availableAction.findFirstOrThrow({
            where: { name: "Send Slack Message" },
        });
    });

    console.log("Available Actions seeded.");

    // 4. Create Dummy Zaps
    // Zap 1: Webhook Catch -> Send Email -> Send Slack
    const zap1 = await prismaClient.$transaction(async (tx) => {
        const z = await tx.zap.create({
            data: {
                userId: dummyUser.id,
                triggerId: "",
                actions: {
                    create: [
                        {
                            actionId: emailAction.id,
                            metadata: {
                                email: "user@example.com",
                                body: "Webhook triggered! Details: {comment}",
                            },
                            sortingOrder: 0,
                        },
                        {
                            actionId: slackAction.id,
                            metadata: {
                                channel: "#notifications",
                                message: "New webhook event received.",
                            },
                            sortingOrder: 1,
                        },
                    ],
                },
            },
        });

        const trig = await tx.trigger.create({
            data: {
                zapId: z.id,
                triggerId: webhookTrigger.id,
                metadata: {
                    endpoint: `/hooks/catch/${dummyUser.id}/${z.id}`,
                },
            },
        });

        return await tx.zap.update({
            where: { id: z.id },
            data: { triggerId: trig.id },
            include: {
                trigger: { include: { type: true } },
                actions: { include: { type: true } },
            },
        });
    });

    console.log(`Created Dummy Zap 1 ID: ${zap1.id}`);

    // Zap 2: GitHub Event -> Send Email
    const zap2 = await prismaClient.$transaction(async (tx) => {
        const z = await tx.zap.create({
            data: {
                userId: dummyUser.id,
                triggerId: "",
                actions: {
                    create: [
                        {
                            actionId: emailAction.id,
                            metadata: {
                                email: "admin@example.com",
                                body: "New GitHub star or issue created!",
                            },
                            sortingOrder: 0,
                        },
                    ],
                },
            },
        });

        const trig = await tx.trigger.create({
            data: {
                zapId: z.id,
                triggerId: githubTrigger.id,
                metadata: {
                    repo: "my-repo",
                    event: "star",
                },
            },
        });

        return await tx.zap.update({
            where: { id: z.id },
            data: { triggerId: trig.id },
            include: {
                trigger: { include: { type: true } },
                actions: { include: { type: true } },
            },
        });
    });

    console.log(`Created Dummy Zap 2 ID: ${zap2.id}`);

    // Zap 3: Solana Tx -> Send Solana Payment
    const zap3 = await prismaClient.$transaction(async (tx) => {
        const z = await tx.zap.create({
            data: {
                userId: dummyUser.id,
                triggerId: "",
                actions: {
                    create: [
                        {
                            actionId: solanaAction.id,
                            metadata: {
                                to: "Gk9...dummyAddress",
                                amount: "0.1",
                            },
                            sortingOrder: 0,
                        },
                    ],
                },
            },
        });

        const trig = await tx.trigger.create({
            data: {
                zapId: z.id,
                triggerId: solanaTrigger.id,
                metadata: {
                    address: "Gk9...watchAddress",
                },
            },
        });

        return await tx.zap.update({
            where: { id: z.id },
            data: { triggerId: trig.id },
            include: {
                trigger: { include: { type: true } },
                actions: { include: { type: true } },
            },
        });
    });

    console.log(`Created Dummy Zap 3 ID: ${zap3.id}`);
    console.log("Seeding complete!");
}

main()
    .then(async () => {
        await prismaClient.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prismaClient.$disconnect();
        process.exit(1);
    });
