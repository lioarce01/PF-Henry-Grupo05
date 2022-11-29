import express from 'express';
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck'

const router = express.Router();
const prisma = new PrismaClient();

type ReqGet = { 
    query: { name: string, cant: number, status: boolean } 
};

// get all shelters or get some by name enables
router.get('/', async(req: ReqGet, res) => {
    const { status, name } = req.query

    try {
        const shelters = await prisma.shelter.findMany({
            where: { 
                enable: status, 
                name: {
                    contains: name || '',
                    mode: 'insensitive'
                },
            },
            orderBy: { "name": "asc" },
            include: { 
                tickets: true,
                author: true,
                followers: true, 
                posts: {
                    where: {
                        enable: status
                    }
                }
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
router.get('/topFive', async(req: ReqGet, res)=>{
    // bauti: la ruta se llama topFive, pero ahora trae custom cantidad x query
    const cant = Math.floor(req.query.cant)
    
    try {
        const shelters = await prisma.shelter.findMany({
            where: { enable: true },
            take: cant ? cant : 6,
            include: { followers: true, posts: true, tickets: true, author: true },
            orderBy: { budget: 'desc' }
        })

        if (shelters) res.status(200).send(shelters);
        else res.status(404).send(shelters);
     } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
     }
});


// interface used to define objects which contain
// the type of filter the user wants to use
interface allFilters {
    animals: [],
    country: string,
    city: string
}

// type definition of body parameters
type ReqSampling = { 
    body: { 
        filter: allFilters 
        order: 'name' | 'budget' | 'followers',
        orderType: 'asc' | 'desc',
        name: string
    } 
};

router.post('/filter-sort', async(req : ReqSampling, res) => {
    // here we are able to expand this further, adding
    // more ordering criteria, filters and name search.
    const { order, orderType, filter, name } = req.body;

    try {
        if (order || filter) { 
            
            const shelters = await prisma.shelter.findMany({
                where: {
                    enable: true,
                    listAnimals: ! filter?.animals ? undefined : {
                        hasSome: filter?.animals,
                    },
                    country: filter?.country,
                    city:    filter?.city,
                    name: {
                        contains: name || '',
                        mode: 'insensitive'
                    },
                },
                include: { 
                    author: true,
                    tickets: true,
                    followers: true, 
                    posts: {
                        where: {
                            enable: true
                        }
                    } 
                },
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
        const state: boolean = true;
        const shelter = await prisma.shelter.findUnique({ 
            where: { id: id},
            include: { 
                goals: true,
                tickets: true,
                followers: true, 
                author: true, 
                posts: {
                    where:{
                        enable: state
                    },
                    include: {
                        author: true,
                        Comment: {
                            where: {
                                enable: state
                            }
                        }
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

// logical enabled to shelters(Admin)
router.put("/enable", async (req, res) => {    
    try {
        const id = req.body.shelterId;
        await prisma.shelter.update({
            where: { id: id },
            data: { enable: true },
        });
        res.status(200).send({message: `Shelter ${id} enabled successfully`})
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
})

// logical disabled to shelters(Admin)
router.put("/disable", async (req, res) => {    
    try {
        const id = req.body.shelterId;
        await prisma.shelter.update({
            where: { id: id },
            data: { enable: false },
        });
        res.status(200).send({message: `Shelter ${id} disabled successfully`})
    } catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.")
        console.log(error)
    }
})


// create a shelter
router.post("/", jwtCheck, async (req, res) => {

    try {
        interface shelterInterface {
            name: string,
            authorId: string ,  
            description: string,
            profilePic: string,
            address: string,
            listAnimals: Array<string>,
            city: string,
            lat: number,
            lon: number,
            country: string,
            website: string,
            budget: number,
        }

        const bodyShelter: shelterInterface = req.body;

        const shelterCreated = await prisma.shelter.create({
            data: {
                name: bodyShelter.name,
                authorId: bodyShelter.authorId,
                description: bodyShelter.description,
                profilePic: bodyShelter.profilePic,
                listAnimals: bodyShelter.listAnimals,
                city: bodyShelter.city,
                lat: bodyShelter.lat,
                lon: bodyShelter.lon,
                country: bodyShelter.country,
                address: bodyShelter.address,
                website: bodyShelter.website,
                budget: bodyShelter.budget,
            }
        })

        res.status(200).send(shelterCreated);
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
})

//on click follow button in shelter profile page, add shelter to user's following list and add user to shelter's followers list 

router.put("/follow", async (req, res) => {
    try {
        const { userId, shelterId } = req.body;

        await prisma.user.update({
            where: { id: userId },
            data: {
                following: {
                    connect: { id: shelterId }
                }
            }
        })

        await prisma.shelter.update({
            where: { id: shelterId },
            data: {
                followers: {
                    connect: { id: userId
                    }
                }
            }
        })

        res.status(200).send('Shelter followed successfully.')
        
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
})


router.put("/unfollow", async (req, res) => {
    try {
        const { userId, shelterId } = req.body;

        await prisma.user.update({
            where: { id: userId },
            data: {
                following: {
                    disconnect: { id: shelterId }
                }
            }
        })

        await prisma.shelter.update({
            where: { id: shelterId },
            data: {
                followers: {
                    disconnect: { id: userId
                    }
                }
            }
        })

        res.status(200).send('Shelter unfollowed successfully.')

    } catch (error) {   
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
})


// update a shelter ALERTA saque jwtCheck
router.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        interface updateInterface {
            name: string,
            description: string,
            profilePic: string,
            city: string,
            country: string,
            listAnimals: Array<string>,
            address: string,
            website: string,
            budget: number,
            lat: number,
            lon: number
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
                listAnimals: bodyShelter.listAnimals,
                website: bodyShelter.website,
                budget: bodyShelter.budget,
                lat: bodyShelter.lat,
                lon: bodyShelter.lon
            },
        })

        res.status(200).json('Shelter updated successfully.')
    } catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
})

// delete a shelter
router.delete("/:id", jwtCheck, async (req, res) => {
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