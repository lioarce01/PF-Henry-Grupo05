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
router.get('/:id/posts', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userWhitPosts = yield prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
            include: {
                post: {
                    where: {
                        published: true,
                    }
                }
            },
        });
        const posts = userWhitPosts === null || userWhitPosts === void 0 ? void 0 : userWhitPosts.post;
        res.status(200).json(userWhitPosts);
    }
    catch (error) {
        console.error(error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map