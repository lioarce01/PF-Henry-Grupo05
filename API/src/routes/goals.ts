import express from 'express';
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck';

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    let {title, content, goal, id}: {title: string, content: string, goal: number, id:string} = req.body
    goal = Number(goal)
    try {
        let g = await prisma.goal.create({data: {
            shelterId: id,
            title,
            content,
            goal
        }})
        console.log(g)
        res.status(200).send({message: "Goal created successfully.", payload: g})

    } catch (error) {
        res.status(400).send({error})
        console.log(error)
    }
})

router.put("/status", async (req, res) => {
    const {id} = req.body

    try {
        let g = await prisma.goal.findFirst({where: {id}})
        await prisma.goal.update({where: {id},data: {
            enable: g?.enable === true ? false : true
        }})
        res.status(200).send({message: "Goal updated successfully."})

    } catch (error) {        
        res.status(400).send({error})
    }
})

router.put("/", async (req, res) => {
    const {id, title, goal, content} = req.body

    try {
        await prisma.goal.update({where: {id}, data: {
            title,
            goal,
            content
        }})
        res.status(200).send({message: "Goal updated successfully."})

    } catch (error) {        
        res.status(400).send({error})
    }
})  

export default router