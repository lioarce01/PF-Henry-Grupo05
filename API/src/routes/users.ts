import express from "express";
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck'
import { sendMailCreate } from "../middleware/nodemailer";

const router = express.Router();
const prisma = new PrismaClient();

type Req = {
    query: {
        name: string,
        email: string,
        status: boolean
    };
    body: {
        name: string
        email: string
        profilePic: string
        id: string
    };
};

// get all users, or search them by name enables

router.get("/email/:email", async (req, res) => {
    try {
        const {email} = req.params
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: { 
                Shelter: true, 
                following: {
                    where: {
                        enable: true
                    }
                }, 
                posts: {
                    where: {
                        enable: true
                    },
                    include: {
                        Comment:{
                            where: {
                                enable: true
                            }
                        }
                    }
                } 
            }
        })

        user ? res.status(200).send({message: "the user was found", payload: user}) : res.status(404).send({error: "user was not found"})
    } catch (error: any) {
        res.status(404).send({error: error.message})
    }
})

router.get("/", async (req: Req, res) => {
    try {
        const { name, status } = req.query;

        const user = await prisma.user.findMany({
            where: { 
                name: {
                    contains: name || '',
                    mode: 'insensitive'
                },
                enable: status
            },

            include: { 
                Shelter: {
                    where : {
                        enable: status
                    }
                },
                
                posts: {
                        where: {
                            enable: status
                        },

                        include: {
                            Comment:{
                                where: {
                                    enable: status
                                }
                            }
                        }
                },

                following: {
                    where: {
                        enable: status
                    }
                },
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
    const state : boolean = true;
    try {
        const user = await prisma.user.findUnique({ 
            where: { id },
            include: { 
                Shelter: true, 
                following: {
                    where: {
                        enable: state
                    }
                }, 
                posts: {
                    where: {
                        enable: state
                    },
                    include: {
                        Comment:{
                            where: {
                                enable: true
                            }
                        }
                    }
                } 
            }
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
            include: { 
                following: {
                    include: {
                        author: true
                    }
                } 
            }
        });

        user ? res.status(200).send(user.following) : res.status(404).send("ERROR: User not found.");
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// create an user
router.post("/", async (req: Req, res) => {
    const { name, email, profilePic } = req.body;

    try {
        const newUser = await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                name,
                email,
                profilePic
            },
            include:{
                posts: true,
                Shelter: true,
                Comment: true,
                following: true 
            }
        });

        sendMailCreate(name, email)
        
        res.status(200).send({message: "User created successfully.", newUser: newUser});
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// logical enabled to users (Admin)
router.put('/enable',  async(req, res)=>{
    try {
        const id = req.body.userId;
        await prisma.user.update({
            where: { id },
            data: { enable: true },
        });
        res.status(200).send(`User ${id} enabled successfully`)
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
   
})

router.put('/admin', jwtCheck, async(req, res)=>{
    try {
        const { userId, adminId, removeAdmin = false } = req.body;
        const admin = await prisma.user.findUnique({
            where: { id: adminId }
        });

        if(! admin) res.status(404).send('Username is not found.')
        if(admin?.role === 'User') res.status(400).send("Require admin permissions.")

        const newAdmin = await prisma.user.update({
            where: { id: userId },
            data: { role: removeAdmin ? "User" : "Admin" },
        });

        res.status(200).send({ message: `User ${newAdmin.name} is now ${removeAdmin ? "User" : "Admin"}`, payload: newAdmin })
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    } 
})


// logical disabled to users (Admin)
router.put('/disable', async(req, res) => {
    try {
        const id = req.body.userId;

        await prisma.user.update({
            where: { id },
            data: { enable: false },
        });

        res.status(200).send(`User ${id} disabled successfully`)
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
   
})

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
        const userDelete = await prisma.user.delete({ where: { id } })

        userDelete ? res.status(200).send("User deleted successfully.") : res.status(404).send("ID could not be found.")
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

export default router;