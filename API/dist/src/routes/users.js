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
// router.get('/:id/posts', async(req,res, next) => {
//     try {
//         const userWhitPosts = await prisma.user.findUnique({
//             where:{
//                 id: req.params.id,
//             },
//             include:{
//                 post: {
//                     where:{
//                         published: true,
//                     }
//                 }
//             },
//         }) ;
//         const posts = userWhitPosts?.post;
//         res.status(200).json(userWhitPosts);
//     } catch (error: any) {
//         console.error(error.message)
//     }
// });
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name } = req.query;
    let user = yield prisma.user.findMany({
        where: { name: { contains: name, mode: "insensitive" } },
    });
    if (name) {
        return user.length
            ? res.status(200).send(user)
            : res.status(404).send("User not found");
    }
    else {
        res.status(200).send(yield prisma.user.findMany());
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let user = yield prisma.user.findUnique({ where: { id: id } });
    return user
        ? res.status(200).send(user)
        : res.status(404).send("User not found");
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, profilePic } = req.body;
    try {
        yield prisma.user.create({
            data: {
                name,
                email,
                profilePic,
            },
        });
        return res.status(200).send("User created");
    }
    catch (_a) {
        return res.status(400).send("Error");
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let { name, email, profilePic } = req.body;
    try {
        yield prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                profilePic,
            },
        });
        return res.status(200).send("User updated");
    }
    catch (_b) {
        return res.status(400).send("Error");
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        yield prisma.user.delete({
            where: { id },
        });
        res.status(200).send("User deleted");
    }
    catch (_c) {
        return res.status(400).send("Error");
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map