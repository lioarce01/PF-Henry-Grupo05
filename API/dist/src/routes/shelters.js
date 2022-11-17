"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jwtCheck_1 = require("../jwtCheck");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// get all shelters or get some by name
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const shelters = yield prisma.shelter.findMany({
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
        });
        if (shelters.length)
            res.status(200).send(shelters);
        else
            res.status(404).send('ERROR: Could not find any shelters');
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// get top five shelters by budget
router.get('/topFive', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // bauti: la ruta se llama topFive, pero ahora trae custom cantidad x query
    const cant = Math.floor(req.query.cant);
    try {
        const shelters = yield prisma.shelter.findMany({
            take: cant ? cant : 6,
            include: { followers: true, posts: true },
            orderBy: { budget: 'desc' }
        });
        if (shelters)
            res.status(200).send(shelters);
        else
            res.status(404).send(shelters);
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
router.post('/filter-sort', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // here we are able to expand this further, adding
    // more ordering criteria and even filters.
    const { order, orderType, group, groupType } = req.body;
    try {
        if (order || group) {
            const shelters = yield prisma.shelter.findMany({
                where: { [group]: groupType },
                include: { followers: true },
                orderBy: order === "followers" ? { followers: { _count: orderType } } : { [order]: orderType }
            });
            if (shelters)
                res.status(200).send(shelters);
            else
                res.status(404).send('ERROR: Could not find any shelters');
        }
        else {
            res.status(404).send('ERROR: Missing parameters.');
        }
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// get a shelter by its id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const shelter = yield prisma.shelter.findUnique({
            where: { id: id },
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
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// create a shelter
router.post("/", jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyShelter = req.body;
        const shelterCreated = yield prisma.shelter.create({
            data: {
                name: bodyShelter.name,
                authorId: bodyShelter.authorId,
                description: bodyShelter.description,
                profilePic: bodyShelter.profilePic,
                animals: bodyShelter.animals,
                city: bodyShelter.city,
                lat: bodyShelter.lat,
                lon: bodyShelter.lon,
                country: bodyShelter.country,
                address: bodyShelter.address,
                website: bodyShelter.website,
                budget: bodyShelter.budget,
                goal: bodyShelter.goal
            }
        });
        res.status(200).send(shelterCreated);
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
//on click follow button in shelter profile page, add shelter to user's following list and add user to shelter's followers list 
router.post("/follow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, shelterId } = req.body;
        yield prisma.user.update({
            where: { id: userId },
            data: {
                following: {
                    connect: { id: shelterId }
                }
            }
        });
        yield prisma.shelter.update({
            where: { id: shelterId },
            data: {
                followers: {
                    connect: { id: userId
                    }
                }
            }
        });
        res.status(200).send('Shelter followed successfully.');
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// logical enabled to shelters(Admin)
router.put("/enable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.shelterId;
        yield prisma.shelter.update({
            where: { id: id },
            data: { enable: true },
        });
        res.status(200).send(`Shelter ${id} enabled successfully`);
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// logical disabled to shelters(Admin)
router.put("/disable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.shelterId;
        yield prisma.shelter.update({
            where: { id: id },
            data: { enable: false },
        });
        res.status(200).send(`Shelter ${id} disabled successfully`);
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
router.delete("/unfollow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, shelterId } = req.body;
        yield prisma.user.update({
            where: { id: userId },
            data: {
                following: {
                    disconnect: { id: shelterId }
                }
            }
        });
        yield prisma.shelter.update({
            where: { id: shelterId },
            data: {
                followers: {
                    disconnect: { id: userId
                    }
                }
            }
        });
        res.status(200).send('Shelter unfollowed successfully.');
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// update a shelter
router.put("/:id", jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bodyShelter = req.body;
        yield prisma.shelter.update({
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
        });
        res.status(200).json('Shelter updated successfully.');
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// delete a shelter
router.delete("/:id", jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedShelter = yield prisma.shelter.delete({
            where: { id },
        });
        deletedShelter ? res.status(200).send("Shelter deleted successfully") : res.status(404).send("ID could not be found.");
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=shelters.js.map