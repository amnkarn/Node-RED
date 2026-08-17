import prismaClient from "@repo/db/client";

const user = prismaClient.user.create({
    data: {
        email: "",
        password: "",
    }
})