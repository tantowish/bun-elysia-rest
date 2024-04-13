import { Elysia, t } from "elysia";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../repository/posts.repository";
import { Post } from "@prisma/client";

export const postsRoutes = new Elysia({prefix: '/posts'})
    .get('/', () => getPosts() )
    .get('/:id', ({params: { id }} : { params: { id: number }}) => getPost(id),{
        params: t.Object({
            id: t.Numeric()
        })
    })
    .post('/', ({ body }: {body: Post}) => createPost(body), {
        body: t.Object({
            title: t.String({
                minLength: 3,
                maxLength: 50,
            }),
            content: t.String({
                minLength: 3,
                maxLength: 50,
            })
        })
    })
    .patch('/:id', ({params: { id }, body }: { params: { id: number }, body: Post }) => updatePost(id, body), {
        body: t.Object({
            title: t.Optional(
                t.String({
                    minLength: 3,
                    maxLength: 50,
                })
            ),
            content: t.Optional(
                t.String({
                    minLength: 3,
                    maxLength: 50,
                })
            ),
        }),
        params: t.Object({
            id: t.Numeric()
        })
    })
    .delete('/:id', ({params: { id }} : { params: { id: number }}) => deletePost(id),{
        params: t.Object({
            id: t.Numeric()
        })
    })