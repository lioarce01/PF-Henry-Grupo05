import express from 'express';
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck';

const router = express.Router();
const prisma = new PrismaClient();

// obtener todos los tickets
router.get('/', async(req,res) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                shelter: true,
                comments: {
                    include: {
                        author: true
                    }
                }
            }
        })
        tickets.reverse()
        res.status(200).send({payload: tickets})
    } catch (error) {
        res.status(400).send({error})
    }
})

// obtener ticket en especifico 
router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params
        console.log(id)
        const ticket = await prisma.ticket.findUnique({
            where: {
                id
            },
            include: {
                shelter: true,
                comments: {
                    include: {
                        author: true
                    }
                }
            }
        
            
        })
        if(!ticket) return res.status(404).send({error: "ticket not found"})
        res.status(200).send({payload: ticket})
    } catch (error) {
        res.status(400).send({error: "ticket not found"})
    }
})

// obtener tickets de una shelter en espefico
router.get('/shelter/:id', async(req,res) => {
    try {
        const {id} = req.params
        const ticket = await prisma.ticket.findMany({
            where: {
                shelterId: id
            },         
            include: {
                shelter: true,
                comments: {
                    include: {author: true}
                }
            }
        })
        ticket.reverse()     
        res.status(200).send({payload: ticket})
    } catch (error) {
        res.status(400).send({error: "tickets not found"})
    }
})

// cambiar el estado del ticket
router.put("/status", async(req,res) => {
    try {
        const {id, status} = req.body
        if(!id || !status) return res.status(400).send({error: "missing data"})
        const ticket = await prisma.ticket.update({
            where: {
                id
            },
            data: {
                status
            },
            include: {shelter: true, comments: {include: {author: true}}}
        })
        res.status(200).send({message: "status changed", payload: ticket})
    } catch (error) {
        res.status(400).send({error})
    }
})

router.post('/respond', async(req,res) => {
    try {
        const {content, authorId, ticketId} = req.body
        if(!content || !authorId || !ticketId) return res.status(400).send({error: "missing data"})
        const newComment = await prisma.comment.create({
            data: {
                authorId,
                ticketId,
                content
            },
            include: {
                author: true,
                ticket: true
            }
        })
        const ticket = await prisma.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                status: "closed"
            },
            include: {shelter: true, comments: {include: {author: true}}}
        })
        res.status(201).send({payload: newComment, ticket})
    } catch (error) {
        res.status(400).send({error})
    }
})

// cambiar cualquier dato del ticket, menos shelterId
router.put("/:id", async(req,res) => {
    try {
        const {id} = req.params
        const { status, content, title} = req.body
        const ticket = await prisma.ticket.update({
            where: {
                id
            },
            data: {
                status,
                content,
                title
            },
            include: {shelter: true, comments: {include: {author: true}}}
        })
        res.status(200).send({message: "ticket changed", payload: ticket})
    } catch (error) {
        res.status(400).send({error})
    }
})

// crear un post 
router.post("/", async(req,res) => {
    try {
        const {title, content, shelterId, status} = req.body
        if(!title || !content || !shelterId) return res.status(400).send({error: "missing data"})
        const newTicket = await prisma.ticket.create({
            data: {
                shelterId,
                content,
                title,
                status
            },
            include: {
                shelter: true,
                comments: {
                    include: {author: true}
                }
            }
        })
        res.status(201).send({message: "ticket created successfully", payload: newTicket})
    } catch (error) {
        res.status(400).send({error})
    }
})

// eliminar de la faz de la tierra un ticket
router.delete("/:id", async(req,res) => {
    try {
        const {id} = req.params
        const ticket = await prisma.ticket.delete({
            where: {id}
        })
        res.status(200).send({message: "ticket deleted", payload: ticket})
    } catch (error) {
        res.status(400).send({error})
    }
})

export default router;