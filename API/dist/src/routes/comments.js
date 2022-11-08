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
//toute to get all comments
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield prisma.comment.findMany({
            include: {
                author: true,
                post: true
            },
        });
        if (comments) {
            return res.status(200).json(comments);
        }
        else {
            throw new Error('Comments not founds');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to get a comment by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getComment = yield prisma.comment.findMany({
            where: {
                id: req.params.id
            },
            include: {
                author: true,
                post: true
            },
        });
        if (getComment) {
            return res.status(200).json(getComment);
        }
        else {
            throw new Error('Comments not founds');
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to make the POST of a comment
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPost = req.body;
        const comment = yield prisma.comment.create({
            data: {
                authorId: bodyPost.authorId,
                content: bodyPost.content,
                postId: bodyPost.postId
            }
        });
        res.status(200).send('Post Successful');
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to delete comments by id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield prisma.comment.delete({
            where: {
                id: req.params.id
            }
        });
        console.log(comment);
        res.status(200).send('Delete successful');
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
//route to edit a comment
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPut = req.body;
        const updateComment = yield prisma.comment.update({
            where: {
                id: bodyPut.id,
            },
            data: {
                content: bodyPut.content,
            },
        });
        res.status(200).send('Update successful');
    }
    catch (error) {
        console.error(error.message);
        res.status(404).json(error);
    }
}));
exports.default = router;
//# sourceMappingURL=comments.js.map