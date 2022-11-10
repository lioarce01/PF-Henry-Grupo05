import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

type Req = {
    query: { name: string };
    body: {
        name: string
        email: string
        profilePic: string
        id: string
    };
};

/* router.get('/:id/posts', async(req,res, next) => {
     try {
         const userWhitPosts = await prisma.user.findUnique({
             where:{
                 id: req.params.id,
             },
             include:{
                 post: {
                     where:{
                         published: true,
                     }
                 }
             },
         }) ;

         const posts = userWhitPosts?.post;
         res.status(200).json(userWhitPosts);
     } catch (error: any) {
         console.error(error.message)
     }
}); */

// get all users, or search them by name
router.get("/", async (req: Req, res) => {
    try {
        const { name } = req.query;

        const user = await prisma.user.findMany({
            where: { name: { contains: name } },
            include: { posts: true }
        });

        user.length ? res.status(200).send(user) : res.status(404).send('ERROR: Could not find any users.');
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// get an user by its id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({ 
            where: { id },
            include: { following: true, posts: true }
        });

        user ? res.status(200).send(user) : res.status(404).send("ERROR: User not found.");
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// create an user
router.post("/", async (req: Req, res) => {
    const { name, email, profilePic } = req.body;

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                profilePic,
            },
        });

        res.status(200).send("User created successfully.");
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// update an user
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, profilePic } = req.body;

    try {
        await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                profilePic,
            },
        });

        res.status(200).send("User updated");
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// delete an user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: { id },
        });

        res.status(200).send("User deleted successfully.");
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

export default router;
