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
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const ongs = yield prisma.oNG.findMany({
            where: { name: { contains: name } },
            include: { followers: true }
        });
        if (ongs.length)
            return res.status(200).send(ongs);
        else
            res.status(404).send('Could not find any GNOs');
    }
    catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
}));
router.get('/topFive', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ongs = yield prisma.oNG.findMany({
            take: 5,
            include: { followers: true },
            orderBy: { budget: 'desc' }
        });
        if (ongs)
            res.status(200).send(ongs);
        else
            res.status(404).send(ongs);
    }
    catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ong = yield prisma.oNG.findUnique({
            where: { id },
            include: { followers: true, author: true }
        });
        ong ? res.status(200).send(ong) : res.status(404).send("Could not find GNO.");
    }
    catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyOng = req.body;
        yield prisma.oNG.create({
            data: {
                name: bodyOng.name,
                authorId: bodyOng.authorId,
                description: bodyOng.description,
                address: bodyOng.address,
                website: bodyOng.website,
                budget: bodyOng.budget,
                goal: bodyOng.goal
            }
        });
        res.status(200).json('GNO created successfully.');
    }
    catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bodyOng = req.body;
        yield prisma.oNG.update({
            where: { id },
            data: {
                name: bodyOng.name,
                description: bodyOng.description,
                address: bodyOng.address,
                website: bodyOng.website,
                budget: bodyOng.budget,
                goal: bodyOng.goal
            },
        });
        res.status(200).json('GNO updated successfully.');
    }
    catch (error) {
        res.status(400).send('There was an unexpected error.');
        console.log(error);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.oNG.delete({
            where: { id },
        });
        res.status(200).send("GNO deleted successfully");
    }
    catch (error) {
        res.status(400).send("There was an unexpected error.");
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=ongs.js.map