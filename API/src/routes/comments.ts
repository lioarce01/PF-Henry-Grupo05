import express from 'express';
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck';

const router = express.Router();
const prisma = new PrismaClient();

// get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                author: true,
                post: true
            },
        })

        comments ? res.status(200).send(comments) : res.status(404).send("ERROR: Comments not found.")
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
});

// get a comment by its id
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const getComment = await prisma.comment.findMany({
            where: { id: id },
            include: {
                author: true,
                post: true
            },
        })

        getComment ? res.status(200).json(getComment) : res.status(404).send("ERROR: Comment not found.")
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
});

// create a comment
router.post('/', jwtCheck, async (req, res) => {
    try {
        interface commentInterface {
            authorId: string,
            postId: string,
            content: string
        }

        const bodyPost: commentInterface = req.body;

        await prisma.comment.create({
            data: {
                authorId: bodyPost.authorId,
                content: bodyPost.content,
                postId: bodyPost.postId
            }
        })

        res.status(200).send('Comment posted succesfully.')
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
});
// logical disabled to comments(Admin)
router.put('/disable/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        await prisma.comment.update({
            where: { id: id },
            data: { enable: false },
        });
        res.status(200).send(`Comment ${id} disabled successfully`)
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
   
})
// delete comment
router.delete('/:id', jwtCheck, async (req, res) => {
    const id = req.params.id;

    try {
        const deletedComment = await prisma.comment.delete({
            where: { id }
        });

        deletedComment ? res.status(200).send('Comment deleted successfully.') : res.status(404).send("ID could not be found.");
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
});

// edit a comment
router.put('/', jwtCheck, async (req, res) => {
    try {

        interface commentInterface {
            id: string,
            content: string
        }

        const bodyPut: commentInterface = req.body;

        await prisma.comment.update({
            where: { id: bodyPut.id },
            data: { content: bodyPut.content },
        })
        res.status(200).send('Comment edited successfully')
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
});

export default router;