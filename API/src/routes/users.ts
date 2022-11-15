import express from "express";
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck'

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
            include: { posts: true,
                following: true,
             }
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

// get a shelter followed by an user
router.get("/:id/following", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { following: true }
        });

        user ? res.status(200).send(user.following) : res.status(404).send("ERROR: User not found.");
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// route to follow a shelter by an user
router.post("/:id/follow", async (req, res) => {
    const { id } = req.params;
    const { shelterId } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { following: true }
        });
    
        if (user) {
            const shelter = await prisma.shelter.findUnique({
                where: { id: shelterId },
                include: { followers: true }
            });

            if (shelter) {
                const following = await prisma.user.update({
                    where: { id },
                    data: {
                        following: {
                            connect: { id: shelterId }
                        }
                    },
                    include: { following: true }
                });

                const followers = await prisma.shelter.update({
                    where: { id: shelterId },
                    data: {
                        followers: {
                            connect: { id }
                        }
                    },
                    include: { followers: true }
                });

                res.status(200).send({ following, followers });
            } else {
                
                res.status(404).send("ERROR: Shelter not found.");
            }
        } else {
            res.status(404).send("ERROR: User not found.");
        }
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// create an user
router.post("/", jwtCheck, async (req: Req, res) => {
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
router.put("/:id", jwtCheck, async (req, res) => {
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
router.delete("/:id", jwtCheck, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        deletedUser ? res.status(200).send("User deleted successfully.") : res.status(404).send("ID could not be found.");
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

export default router;
