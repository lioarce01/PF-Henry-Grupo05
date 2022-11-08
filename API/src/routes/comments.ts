import express from 'express';
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

//toute to get all comments
router.get('/', async(req,res)=>{
    try {
        const comments = await prisma.comment.findMany({
         include: {
            author:true,
            post:true
           },
        })
        if (comments){  
             return res.status(200).json(comments);
         }else{
             throw new Error('Comments not founds')
         }
     } catch (error: any) {
         console.error(error.message) 
         res.status(404).json(error) 
     }
});

//route to get a comment by id
router.get('/:id', async(req,res)=>{
    try {
        const getComment = await prisma.comment.findMany({
            where:{
                id: req.params.id
            },
            include: {
                author:true,
                post:true
           },
        })
        if (getComment){  
             return res.status(200).json(getComment);
         }else{
             throw new Error('Comments not founds')
         }
     } catch (error: any) {
         console.error(error.message) 
         res.status(404).json(error) 
     }
});

//route to make the POST of a comment
router.post('/', async(req,res) =>{
    try {
        interface commentInterface{
            authorId: string ,
            postId: string ,  
            content: string
        }
        const bodyPost: commentInterface = req.body;
        const comment = await prisma.comment.create({
            data:{
                authorId: bodyPost.authorId,
                content: bodyPost.content,
                postId: bodyPost.postId
            }
        })
        res.status(200).send('Post Successful')
    } catch (error: any) {
        console.error(error.message); 
        res.status(404).json(error)  
    }
});

//route to delete comments by id
router.delete('/:id', async(req,res) => {
    try {
        const comment = await prisma.comment.delete({
            where:{
                id: req.params.id
            }
        });
        console.log(comment)
        res.status(200).send('Delete successful')
    } catch (error:any) {
        console.error(error.message);
        res.status(404).json(error)   
    }
});

//route to edit a comment
router.put('/', async(req,res) =>{
    try {
        interface commentInterface{
            id: string,
            content: string
        }
        const bodyPut: commentInterface = req.body;
        const updateComment= await prisma.comment.update({
            where: {
                id: bodyPut.id,
              },
              data: {
                content: bodyPut.content,
              },
        })
        res.status(200).send('Update successful')
    } catch (error: any) {
        console.error(error.message);
        res.status(404).json(error) 
    }
});

export default router;