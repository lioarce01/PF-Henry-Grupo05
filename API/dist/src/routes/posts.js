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
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
//route to get all posts
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            include: {
                author: true,
                Comment: true,
            },
        });
        if (posts) {
            return res.status(200).json(posts);
        }
        else {
            throw new Error('Posts not founds');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to get all posts sorted by most recents
router.get('/mostRecents', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            include: {
                author: true,
                Comment: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        if (posts) {
            return res.status(200).json(posts);
        }
        else {
            throw new Error('Posts not founds');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to get all posts sorted by oldest
router.get('/oldest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            include: {
                author: true,
                Comment: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        if (posts) {
            return res.status(200).json(posts);
        }
        else {
            throw new Error('Posts not founds');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to sort by most likes
router.get('/mostLikes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            include: {
                author: true,
                Comment: true,
            },
            orderBy: {
                likes: 'desc'
            }
        });
        if (posts) {
            return res.status(200).json(posts);
        }
        else {
            throw new Error('Posts not founds');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to sort by post with less likes
router.get('/lessLikes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            include: {
                author: true,
                Comment: true,
            },
            orderBy: {
                likes: 'asc'
            }
        });
        if (posts) {
            return res.status(200).json(posts);
        }
        else {
            throw new Error('Posts not founds');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to make the POST of a post
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPost = req.body;
        const post = yield prisma.post.create({
            data: {
                authorId: bodyPost.authorId,
                content: bodyPost.content,
                image: bodyPost.image
            }
        });
        res.status(200).json(post);
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to edit a post
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPost = req.body;
        const updateUser = yield prisma.post.update({
            where: {
                id: bodyPost.id,
            },
            data: {
                content: bodyPost.content,
                image: bodyPost.image
            },
        });
        res.status(200).send('Update successful');
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to get posts by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma.post.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                author: true,
                Comment: true,
            },
        });
        if (post) {
            return res.status(200).json(post);
        }
        else {
            throw new Error('Post not found');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to delete posts by id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma.post.delete({
            where: {
                id: req.params.id
            }
        });
        console.log(post);
        res.status(200).send('successful');
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=posts.js.map