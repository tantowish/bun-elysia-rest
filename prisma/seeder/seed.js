import { PrismaClient } from "@prisma/client";
import { postsToCreate } from "./postSeeder.js";

const prismaClient = new PrismaClient()

const seed = async(posts) => {
    console.log('Creating posts ...')

    for(let i = 0; i < posts.length; i++){
        await prismaClient.post.upsert({
            where: {
                id:posts[i].id
            },
            update: posts[i],
            create: posts[i]
        })
    }
}

seed(postsToCreate)
    .then(() => {
        console.log('Created/Updated posts successfully')
    })
    .catch((e) => {
        console.log('Error: ', e)
    })
    .finally(() => {
        prismaClient.$disconnect()
        console.log('Disconnected Prisma Client, exiting.')
    })