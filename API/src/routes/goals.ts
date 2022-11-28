import express from 'express';
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck';

const router = express.Router();
const prisma = new PrismaClient();


router.get("/", async (req, res) => {

    try {
        const goals = await prisma.goal.findMany()

        goals.length ? res.status(200).send(goals) : res.status(404).send({message: "Goals not found"})
    } catch (err) {
        res.status(400).send({message: "Error getting goals"})
    }
})


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

router.put("/enable", async (req, res) => {
    const {id} = req.body

    try {
        let updatedGoal = await prisma.goal.update({
            where: { id: id },
            data: { enable: true }
        })
        res.status(200).send(updatedGoal)

    } catch (error) {        
        res.status(400).send({error})
    }
})

router.put("/disable", async (req, res) => {
    const {id} = req.body

    try {
        let updatedGoal = await prisma.goal.update({
            where: { id: id },
            data: { enable: false }
        })
        res.status(200).send(updatedGoal)

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

router.delete("/delete", async (req, res) => {
    const { id } = req.body

    try {
        await prisma.goal.delete({
            where: { id }
        })

        res.status(200).send({message: "Goal deleted successfully"})

    } catch(e) {
        res.status(400).send("Error deleting goal")
    }
})

export default router