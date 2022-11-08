import express from 'express';
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

//route to get all posts
router.get('/', async(req,res) => {

    try {
       const posts= await prisma.post.findMany({
        include: {
            author:true,
            Comment: true,
          },
       })
       if (posts){  
            return res.status(200).json(posts);
        }else{
            throw new Error('Posts not founds')
        }
    } catch (error: any) {
        console.error(error.message) 
        res.status(404).json(error) 
    }
});

//route to get all posts sorted by most recents
router.get('/mostRecents', async(req,res)=>{
    try {
        const posts= await prisma.post.findMany({
         include: {
             author:true,
             Comment: true,
           },
           orderBy:{
            createdAt: 'desc'
           }
        })
        if (posts){  
             return res.status(200).json(posts);
         }else{
             throw new Error('Posts not founds')
         }
     } catch (error: any) {
         console.error(error.message) 
         res.status(404).json(error) 
     }
});

//route to get all posts sorted by oldest
router.get('/oldest', async(req,res)=>{
    try {
        const posts= await prisma.post.findMany({
         include: {
             author:true,
             Comment: true,
           },
           orderBy:{
            createdAt: 'asc'
           }
        })
        if (posts){  
             return res.status(200).json(posts);
         }else{
             throw new Error('Posts not founds')
         }
     } catch (error: any) {
         console.error(error.message)
         res.status(404).json(error)  
     }
});

//route to sort by most likes
router.get('/mostLikes', async(req,res)=>{
    try {
        const posts= await prisma.post.findMany({
         include: {
             author:true,
             Comment: true,
           },
           orderBy:{
            likes: 'desc'
           }
        })
        if (posts){  
             return res.status(200).json(posts);
         }else{
             throw new Error('Posts not founds')
         }
     } catch (error: any) {
         console.error(error.message) 
         res.status(404).json(error) 
     }
});

//route to sort by post with less likes
router.get('/lessLikes', async(req,res)=>{
    try {
        const posts= await prisma.post.findMany({
         include: {
             author:true,
             Comment: true,
           },
           orderBy:{
            likes: 'asc'
           }
        })
        if (posts){  
             return res.status(200).json(posts);
         }else{
             throw new Error('Posts not founds')
         }
     } catch (error: any) {
         console.error(error.message) 
         res.status(404).json(error) 
     }
});

//route to make the POST of a post
router.post('/', async(req,res) =>{
    try {
        interface postInterface{
            authorId: string ,  
            content: string,
            image:string
        }
        const bodyPost: postInterface = req.body;
        const post = await prisma.post.create({
            data:{
                authorId: bodyPost.authorId,
                content: bodyPost.content,
                image: bodyPost.image
            }
        })
        res.status(200).json(post)
    } catch (error: any) {
        console.error(error.message); 
        res.status(404).json(error)  
    }
});

//route to edit a post
router.put('/', async(req,res) =>{
    try {
        interface updateInterface{
            id: string ,  
            content: string,
            image:string
        }
        const bodyPost: updateInterface = req.body;
        const updateUser = await prisma.post.update({
            where: {
              id: bodyPost.id,
            },
            data: {
              content: bodyPost.content,
              image: bodyPost.image
            },
          })
          res.status(200).send('Update successful')
    } catch (error: any) {
        console.error(error.message); 
        res.status(404).json(error) 
    }
})

//route to get posts by id
router.get('/:id', async(req,res) => {
    try {
        const post = await prisma.post.findUnique({
            where:{
                id: req.params.id
            },
            include: {
                author: true,
                Comment: true,
            },
        });
        if(post){
            return res.status(200).json(post)
        }else{
            throw new Error('Post not found')
        }
    } catch (error: any) {
        console.error(error.message); 
        res.status(404).json(error)      
    }
});

//route to delete posts by id
router.delete('/:id', async(req,res) => {
    try {
        const post = await prisma.post.delete({
            where:{
                id: req.params.id
            }
        });
        console.log(post)
        res.status(200).send('successful')
    } catch (error:any) {
        console.error(error.message) ;
        res.status(404).json(error)   
    }
});

export default router;