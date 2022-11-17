import express from 'express';
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck';

const router = express.Router();
const prisma = new PrismaClient();


router.get('/all', async(req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                Comment: {
                    include: { author: true }
                },
                shelter: true 
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).send('ERROR: posts not founds.');
        console.log(error);
    }
   
})


//route to get all posts enables
router.get('/', async(req, res) => {

    //traer por query params la cantidad de posts que queremos traer por pagina y la pagina que queremos traer (por defecto 10 posts por pagina y pagina 1)
    const { perPage, page } = req.query;
    const state: boolean = true;
    //si no se envian los query params, se traen todos los posts    
   try {
    if(! perPage || ! page) {
        const posts = await prisma.post.findMany({
            where:{
                enable: state
            },
            include: {
                author: true,
                Comment: {
                    where:{
                        enable: state
                    },
                    include: { author: true }
                },
                shelter: true
              },
              orderBy: {
                createdAt: 'desc'
                }
           })
    
           posts ? res.status(200).json(posts) : res.status(404).json('ERROR: Posts not found.')

    } else {
        const posts = await prisma.post.findMany({
            where:{
                enable: state
            },
            take: parseInt(perPage as string),
            skip: (parseInt(page as string) - 1) * parseInt(perPage as string),
            include: {
                author: true,
                Comment: {
                    where:{
                        enable: state
                    },
                    include: { author: true }
                },
                shelter: true
              },
                orderBy: {
                    createdAt: 'desc'
                }
        });
        res.status(200).json(posts);
    } 
   } catch (error) {
         res.status(500).json(error);
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
    const state: boolean = true;
    try {
        if (order && type) {
            const posts = await prisma.post.findMany({
                where:{
                    enable: state
                },
                include: {
                    author: true,
                    Comment: {
                        where:{
                            enable: state
                        },
                        include: { author: true }
                    },
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
router.post('/', jwtCheck, async(req, res) =>{
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
// logical enabled to posts(Admin)
router.put('/enable', async(req, res)=>{
    try {
        const id = req.body.postId;
        await prisma.post.update({
            where: { id: id },
            data: { enable: true },
        });
        res.status(200).send(`Post ${id} enabled successfully`)
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
   
})
// logical disabled to posts(Admin)
router.put('/disable', async(req, res)=>{
    try {
        const id = req.body.postId;
        await prisma.post.update({
            where: { id: id },
            data: { enable: false },
        });
        res.status(200).send(`Post ${id} disabled successfully`)
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
   
})
// route to edit a post
router.put('/', jwtCheck, async(req, res) =>{
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
});

router.put('/updateLikes', jwtCheck, async(req,res)=>{
    try {
        interface updateInterface {
            id: string ,  
            likes: number
        }
        const bodyPost: updateInterface = req.body;
        const updatedPost = await prisma.post.update({
            where:{
                id: bodyPost.id,
            },
            data:{
                likes: bodyPost.likes
            }
        })
        res.status(200).send('Post likes updated sucessfully.')
        
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error); 
    }
})

// route to get posts by id
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const state : boolean = true;
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                shelter: true,
                author: true,
                Comment: {
                    where: {
                        enable: state
                    },
                    include: { author: true }
                },
            },
        });

        post ? res.status(200).json(post) : res.status(404).send("ERROR: Post not found.")
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error);   
    }
});

// route to delete posts by id
router.delete('/:id', jwtCheck, async(req,res) => {
    const id = req.params.id;

    try {
        const deletedPost = await prisma.post.delete({

            where: { id }
        });
        
        deletedPost ? res.status(200).send("Post deleted successfully.") : res.status(404).send("ID could not be found.")
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error); 
    }
});

export default router;