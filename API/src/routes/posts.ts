import express from 'express';
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async(req,res, next) => {
    try {
      const post = await prisma.post.findMany({
        where:{
            published: true
        },
        orderBy:{
            createdAt: "desc"
        }
      })
      res.status(200).json({post})  
    } catch (error: any) {
        next(error.message)
    }
});

router.post('/', async(req,res, next) =>{
    try {
        interface postInterface{
            authorId: string , 
            published: boolean, 
            title: string,
             description: string
        }
        const bodyPost: postInterface = req.body;
        const post = await prisma.post.create({
            data:{
                authorId: bodyPost.authorId,
                published: bodyPost.published,
                title: bodyPost.title,
                description: bodyPost.description,
                
            }
        })

        res.status(200).json(post)
    } catch (error: any) {
        next(error.message)
    }
});

router.get('/:id', async(req,res, next) => {
    try {
        const post : any = await prisma.post.findUnique({
            where:{
                id: req.params.id
            }
        });
        if(post){
            return res.status(200).json(post)
        }
    } catch (error: any) {
        next(error.message)      
    }
});

router.delete('/:id', async(req,res, next) => {
    try {
        await prisma.post.delete({
            where:{
                id: req.params.id
            }
        })
        res.status(200).send('successful')
    } catch (error:any) {
        next(error.message)   
    }
});

export default router;