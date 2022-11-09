import express from 'express';
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

type Req = { 
    query: { name: string } 
};

router.get('/', async(req: Req, res) => {
    try {
        
        const { name } = req.query;

        const ongs = await prisma.oNG.findMany({
            where: { name: { contains: name } },
            include: { followers: true }
        })

        if (ongs.length) return res.status(200).send(ongs);
        else res.status(404).send('Could not find any GNOs');

    } catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
});

router.get('/topFive', async(req, res)=>{
    try {
        const ongs = await prisma.oNG.findMany({
            take: 5,
            include: { followers: true },
            orderBy: { budget: 'desc' }
        })

        if (ongs) res.status(200).send(ongs);
        else res.status(404).send(ongs);
     } catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
     }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ong = await prisma.oNG.findUnique({ 
            where: { id },
            include: { followers: true, author: true } 
        });
  
        ong ? res.status(200).send(ong) : res.status(404).send("Could not find GNO.");
    } catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
});

router.post("/", async (req, res) => {

    try {
        interface ongInterface {
            name: string,
            authorId: string ,  
            description: string,
            address: string,
            website: string,
            budget: number,
            goal: number
        }

        const bodyOng: ongInterface = req.body;

        await prisma.oNG.create({
            data: {
                name: bodyOng.name,
                authorId: bodyOng.authorId,
                description: bodyOng.description,
                address: bodyOng.address,
                website: bodyOng.website,
                budget: bodyOng.budget,
                goal: bodyOng.goal
            }
        })

        res.status(200).json('GNO created successfully.')
    } catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        interface updateInterface{
            name: string,
            description: string,
            address: string,
            website: string,
            budget: number,
            goal: number
        }

        const bodyOng: updateInterface = req.body;

        await prisma.oNG.update({
            where: { id },
            data: {
                name: bodyOng.name,
                description: bodyOng.description,
                address: bodyOng.address,
                website: bodyOng.website,
                budget: bodyOng.budget,
                goal: bodyOng.goal
            },
        })

        res.status(200).json('GNO updated successfully.')
    } catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.oNG.delete({
            where: { id },
        });

        res.status(200).send("GNO deleted successfully");
    } catch (error) {
        res.status(400).send("There was an unexpected error.");
        console.log(error);
    }
});

export default router;