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
//route to get all posts
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //traer por query params la cantidad de posts que queremos traer por pagina y la pagina que queremos traer (por defecto 10 posts por pagina y pagina 1)
    const { perPage, page } = req.query;
    //si no se envian los query params, se traen todos los posts    
    try {
        if (!perPage || !page) {
            const posts = yield prisma.post.findMany({
                include: {
                    author: true,
                    Comment: {
                        include: { author: true }
                    },
                    shelter: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            posts ? res.status(200).json(posts) : res.status(404).json('ERROR: Posts not found.');
        }
        else {
            const posts = yield prisma.post.findMany({
                take: parseInt(perPage),
                skip: (parseInt(page) - 1) * parseInt(perPage),
                include: {
                    author: true,
                    Comment: {
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
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/sort', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order, type } = req.query;
    try {
        if (order && type) {
            const posts = yield prisma.post.findMany({
                include: {
                    author: true,
                    Comment: {
                        include: { author: true }
                    },
                    shelter: true
                },
                orderBy: {
                    [order]: type
                }
            });
            res.status(200).json(posts);
        }
        else
            res.status(404).send('ERROR: Missing parameters.');
    }
    catch (error) {
        res.status(400).send('ERROR: Invalid parameter.');
        console.log(error);
    }
}));
// route to create post
router.post('/', jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPost = req.body;
        yield prisma.post.create({
            data: {
                shelterId: bodyPost.shelterId,
                authorId: bodyPost.authorId,
                content: bodyPost.content,
                image: bodyPost.image
            }
        });
        res.status(200).send('Post created successfully.');
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// logical disabled to posts(Admin)
router.put('/disable/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield prisma.post.update({
            where: { id: id },
            data: { enable: false },
        });
        res.status(200).send(`Post ${id} disabled successfully`);
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// route to edit a post
router.put('/', jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPost = req.body;
        yield prisma.post.update({
            where: {
                id: bodyPost.id,
            },
            data: {
                content: bodyPost.content,
                image: bodyPost.image
            },
        });
        res.status(200).send('Post updated sucessfully.');
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
router.put('/updateLikes', jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPost = req.body;
        const updatedPost = yield prisma.post.update({
            where: {
                id: bodyPost.id,
            },
            data: {
                likes: bodyPost.likes
            }
        });
        res.status(200).send('Post likes updated sucessfully.');
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// route to get posts by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const post = yield prisma.post.findUnique({
            where: { id },
            include: {
                shelter: true,
                author: true,
                Comment: {
                    include: { author: true }
                },
            },
        });
        post ? res.status(200).json(post) : res.status(404).send("ERROR: Post not found.");
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// route to delete posts by id
router.delete('/:id', jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedPost = yield prisma.post.delete({
            where: { id }
        });
        deletedPost ? res.status(200).send("Post deleted successfully.") : res.status(404).send("ID could not be found.");
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=posts.js.map