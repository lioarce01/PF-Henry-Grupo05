import express from 'express';
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck'

const router = express.Router();
const prisma = new PrismaClient();

type ReqGet = { 
    query: { name: string } };

// get all shelters or get some by name
router.get('/', async(req: ReqGet, res) => {
    try {
        const { name } = req.query;

        const shelters = await prisma.shelter.findMany({
            orderBy: { "name": "asc" },
            where: { 
                name: {
                    contains: name || '',
                    mode: 'insensitive'
                },
            },
            include: { 
                followers: true, 
                posts: true
            }
        })

        if (shelters.length) res.status(200).send(shelters);
        else res.status(404).send('ERROR: Could not find any shelters');

    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// get top five shelters by budget
router.get('/topFive', async(req, res)=>{
    // bauti: la ruta se llama topFive, pero ahora la hago
    // topSix para que se vea mejor el Carousel de landing
    try {
        const shelters = await prisma.shelter.findMany({
            take: 6,
            include: { followers: true, posts: true },
            orderBy: { budget: 'desc' }
        })

        if (shelters) res.status(200).send(shelters);
        else res.status(404).send(shelters);
     } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
     }
});


// order (or filter, in the future) by what is in this Type
type ReqSampling = { 
    body: { 
        group: 'country' | 'city' | 'animals'
        groupType: string
        order: 'name' | 'budget' | 'followers',
        orderType: 'asc' | 'desc',
    } 
};

router.post('/filter-sort', async(req : ReqSampling, res) => {
    // here we are able to expand this further, adding
    // more ordering criteria and even filters.
    const { order, orderType, group, groupType } = req.body;

    try {
        if (order || group) { 
            
            const shelters = await prisma.shelter.findMany({
                where: { [group]: groupType },
                include: { followers: true },
                orderBy: order === "followers" ? {followers: {_count: orderType}} : { [order]: orderType }
            })

            if (shelters) res.status(200).send(shelters);
            else res.status(404).send('ERROR: Could not find any shelters');

        } else {
            res.status(404).send('ERROR: Missing parameters.');
        }

    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
})

// get a shelter by its id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const shelter = await prisma.shelter.findUnique({ 
            where: { id },
            include: { 
                followers: true, 
                author: true, 
                posts: {
                    include: {
                        author: true,
                        Comment: true
                    }
                } 
            } 
        });
  
        shelter ? res.status(200).send(shelter) : res.status(404).send("ERROR: Could not find shelter.");
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
});

// create a shelter
router.post("/", jwtCheck, async (req, res) => {

    try {
        interface shelterInterface {
            name: string,
            authorId: string ,  
            description: string,
            profilePic: string,
            address: string,
            animals: string,
            city: string,
            country: string,
            website: string,
            budget: number,
            goal: number
        }

        const bodyShelter: shelterInterface = req.body;

        await prisma.shelter.create({
            data: {
                name: bodyShelter.name,
                authorId: bodyShelter.authorId,
                description: bodyShelter.description,
                profilePic: bodyShelter.profilePic,
                animals:    bodyShelter.animals,
                city: bodyShelter.city,
                country: bodyShelter.country,
                address: bodyShelter.address,
                website: bodyShelter.website,
                budget: bodyShelter.budget,
                goal: bodyShelter.goal
            }
        })

        res.status(200).send('Shelter created successfully.')
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
})

// update a shelter
router.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        interface updateInterface {
            name: string,
            description: string,
            profilePic: string,
            city: string,
            country: string,
            address: string,
            website: string,
            budget: number,
            goal: number
        }

        const bodyShelter: updateInterface = req.body;

        await prisma.shelter.update({
            where: { id },
            data: {
                name: bodyShelter.name,
                description: bodyShelter.description,
                profilePic: bodyShelter.profilePic,
                city: bodyShelter.city,
                country: bodyShelter.country,
                address: bodyShelter.address,
                website: bodyShelter.website,
                budget: bodyShelter.budget,
                goal: bodyShelter.goal
            },
        })

        res.status(200).json('Shelter updated successfully.')
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
})

// delete a shelter
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShelter = await prisma.shelter.delete({
            where: { id },
        });

        deletedShelter ? res.status(200).send("Shelter deleted successfully") : res.status(404).send("ID could not be found.");
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
});

export default router;