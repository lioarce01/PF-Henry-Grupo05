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
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma.post.findMany({
            where: {
                published: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        res.status(200).json({ post });
    }
    catch (error) {
        next(error.message);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPost = req.body;
        const post = yield prisma.post.create({
            data: {
                authorId: bodyPost.authorId,
                published: bodyPost.published,
                title: bodyPost.title,
                description: bodyPost.description,
            }
        });
        res.status(200).json(post);
    }
    catch (error) {
        next(error.message);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma.post.findUnique({
            where: {
                id: req.params.id
            }
        });
        if (post) {
            return res.status(200).json(post);
        }
    }
    catch (error) {
        next(error.message);
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.post.delete({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send('successful');
    }
    catch (error) {
        next(error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=posts.js.map