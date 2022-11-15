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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const user = yield prisma.user.findMany({
            where: { name: { contains: name } },
            include: { posts: true,
                following: true,
            }
        });
        user.length ? res.status(200).send(user) : res.status(404).send('ERROR: Could not find any users.');
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// get an user by its id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({
            where: { id },
            include: { following: true, posts: true }
        });
        user ? res.status(200).send(user) : res.status(404).send("ERROR: User not found.");
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));

// get a shelter followed by an user

router.get("/:id/following", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({
            where: { id },
            include: { following: true }
        });
        user ? res.status(200).send(user.following) : res.status(404).send("ERROR: User not found.");
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// click a button in the front end to follow a shelter
router.post("/:id/follow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { shelterId } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { id },
            include: { following: true }
        });
        if (user) {
            const shelter = yield prisma.shelter.findUnique({
                where: { id: shelterId },
                include: { followers: true }
            });
            if (shelter) {
                const following = yield prisma.user.update({
                    where: { id },
                    data: {
                        following: {
                            connect: { id: shelterId }
                        }
                    },
                    include: { following: true }
                });
                const followers = yield prisma.shelter.update({
                    where: { id: shelterId },
                    data: {
                        followers: {
                            connect: { id }
                        }
                    },
                    include: { followers: true }
                });
                res.status(200).send({ following, followers });
            }
            else {
                res.status(404).send("ERROR: Shelter not found.");
            }
        }
        else {
            res.status(404).send("ERROR: User not found.");
        }
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// create an user
router.post("/", jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, profilePic } = req.body;
    try {
        yield prisma.user.create({
            data: {
                name,
                email,
                profilePic,
            },
        });
        res.status(200).send("User created successfully.");
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// update an user
router.put("/:id", jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, profilePic } = req.body;
    try {
        yield prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                profilePic,
            },
        });
        res.status(200).send("User updated");
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
// delete an user
router.delete("/:id", jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield prisma.user.delete({
            where: { id },
        });
        deletedUser ? res.status(200).send("User deleted successfully.") : res.status(404).send("ID could not be found.");
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map