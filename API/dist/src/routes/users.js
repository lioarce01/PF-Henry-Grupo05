"use strict";
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
exports.default = router;
//# sourceMappingURL=users.js.map