import express from 'express';
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//route to get all posts
router.get('/', async(req, res) => {

    try {
       const posts = await prisma.post.findMany({
        include: {
            author: true,
            Comment: true,
            shelter: true
          },
       })

       posts ? res.status(200).json(posts) : res.status(404).json('ERROR: Posts not found.')
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error);  
    }
});

// route to order by most old or recent comments, 
// or by most or lesser likes. 
type ReqSampling = { 
    query: { 
        order: 'createdAt' | 'likes'
        type: 'asc' | 'desc', 
    } 
};

router.get('/sort', async(req : ReqSampling, res) => {
    const { order, type } = req.query;

    try {
        if (order && type) {
            const posts = await prisma.post.findMany({
                include: {
                    author: true,
                    Comment: true,
                    shelter: true
                },
    
                orderBy: {
                    [order]: type
                }
            })
    
            res.status(200).json(posts);
        } else res.status(404).send('ERROR: Missing parameters.');
    } catch (error) {
        res.status(400).send('ERROR: Invalid parameter.');
        console.log(error);
    }
})

// route to create post
router.post('/', async(req, res) =>{
    try {
        interface postInterface{
            authorId: string,
            shelterId: string,  
            content: string,
            image: string
        }
        const bodyPost: postInterface = req.body;

        await prisma.post.create({
            data: {
                shelterId: bodyPost.shelterId,
                authorId: bodyPost.authorId,
                content: bodyPost.content,
                image: bodyPost.image
            }
        })

        res.status(200).send('Post created successfully.')
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error);    
    }
});

// route to edit a post
router.put('/', async(req, res) =>{
    try {
        interface updateInterface {
            id: string ,  
            content: string,
            image: string
        }

        const bodyPost: updateInterface = req.body;
        await prisma.post.update({
            where: {
              id: bodyPost.id,
            },

            data: {
              content: bodyPost.content,
              image: bodyPost.image
            },
          })

          res.status(200).send('Post updated sucessfully.')
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error);   
    }
})

// route to get posts by id
router.get('/:id', async(req, res) => {
    const id = req.params.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                shelter: true,
                author: true,
                Comment: true,
            },
        });

        post ? res.status(200).json(post) : res.status(404).send("ERROR: Post not found.")
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error);   
    }
});

// route to delete posts by id
router.delete('/:id', async(req,res) => {
    try {
        await prisma.post.delete({
            where: { id: req.params.id }
        });
        
        res.status(200).send('Post deleted successfully.')
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error); 
    }
});

export default router;