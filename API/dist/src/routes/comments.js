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
// get all comments
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield prisma.comment.findMany({
            include: {
                author: true,
                post: true
            },
        });
        comments ? res.status(200).send(comments) : res.status(404).send("ERROR: Comments not found.");
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// get a comment by its id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const getComment = yield prisma.comment.findMany({
            where: { id: id },
            include: {
                author: true,
                post: true
            },
        });
        getComment ? res.status(200).json(getComment) : res.status(404).send("ERROR: Comment not found.");
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// create a comment
router.post('/', jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPost = req.body;
        yield prisma.comment.create({
            data: {
                authorId: bodyPost.authorId,
                content: bodyPost.content,
                postId: bodyPost.postId
            }
        });
        res.status(200).send('Comment posted succesfully.');
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// logical enabled to comments(Admin)
router.put('/enable', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.commentId;
        yield prisma.comment.update({
            where: { id: id },
            data: { enable: true },
        });
        res.status(200).send(`Comment ${id} enabled successfully`);
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// logical disabled to comments(Admin)
router.put('/disable', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.commentId;
        yield prisma.comment.update({
            where: { id: id },
            data: { enable: false },
        });
        res.status(200).send(`Comment ${id} disabled successfully`);
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// delete comment
router.delete('/:id', jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedComment = yield prisma.comment.delete({
            where: { id }
        });
        deletedComment ? res.status(200).send('Comment deleted successfully.') : res.status(404).send("ID could not be found.");
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
// edit a comment
router.put('/', jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyPut = req.body;
        yield prisma.comment.update({
            where: { id: bodyPut.id },
            data: { content: bodyPut.content },
        });
        res.status(200).send('Comment edited successfully');
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=comments.js.map