import express from 'express';
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

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

export default router;