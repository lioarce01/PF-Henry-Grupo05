import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

type Req = {
  query: {
    name: string;
  };
  body: {
    name: string;
    email: string;
    profilePic: string;
    id: string;
  };
};

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

router.get("/", async (req: Req, res) => {
  let { name } = req.query;
  let user = await prisma.user.findMany({
    where: { name: { contains: name, mode: "insensitive" } },
  });

  if (name) {
    return user.length
      ? res.status(200).send(user)
      : res.status(404).send("User not found");
  } else {
    res.status(200).send(await prisma.user.findMany());
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let user = await prisma.user.findUnique({ where: { id: id } });

  return user
    ? res.status(200).send(user)
    : res.status(404).send("User not found");
});

router.post("/", async (req: Req, res) => {
  let { name, email, profilePic } = req.body;

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        profilePic,
      },
    });
    return res.status(200).send("User created");
  } catch {
    return res.status(400).send("Error");
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { name, email, profilePic } = req.body;
  try {
    await prisma.user.update({
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
  } catch {
    return res.status(400).send("Error");
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).send("User deleted");
  } catch {
    return res.status(400).send("Error");
  }
});

export default router;
