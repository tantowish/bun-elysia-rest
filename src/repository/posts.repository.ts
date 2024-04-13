import { NotFoundError } from "elysia";
import { prismaClient } from ".";

export async function getPosts(){
    try{
        return await prismaClient.post.findMany({
            orderBy: {
                created_at: 'asc'
            }
        })
    } catch(e: unknown) {
        console.log(`Error getting posts: ${e}`)
    }
}

export async function getPost(id: number) {
    try{
        const post =  await prismaClient.post.findMany({
            where: {
                id: id
            }
        })

        if(!post){
            throw new NotFoundError('Post not found')
        }

        return post
    } catch(e: unknown) {
        console.log(`Error getting post: ${e}`)
    }
}

export async function createPost(options: {title: string, content: string}) {
    try{
        const {title, content} = options
        return await prismaClient.post.create({
            data: {
                title: title,
                content: content
            }
        })
    } catch(e: unknown){
        console.log(`Error creating post: ${e}`)
    }
}

export async function updatePost(id: number, options: {title?: string, content?: string}) {
    try{
        const {title, content} = options
        return await prismaClient.post.update({
            where:{
                id: id
            },
            data: {
                ...(title ? {title} : {}),
                ...(content ? {content} : {}),
            }
        })
    } catch(e: unknown) {
        console.log(`Error updating post: ${e}`)
    }
}

export async function deletePost(id: number) {
    try{
        return await prismaClient.post.delete({
            where: {
                id: id
            }
        })
    } catch(e: unknown){
        console.log(`Error deleting post: ${e}`)
    }
} 