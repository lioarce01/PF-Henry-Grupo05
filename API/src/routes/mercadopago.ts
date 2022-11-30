import { CreatePreferencePayload} from 'mercadopago/models/preferences/create-payload.model';
import { CreatePreApprovalPayload } from "mercadopago/models/preapproval/create-payload.model"
import express from 'express';
import mercadopago from "mercadopago"
import axios from "axios"
import { PrismaClient } from "@prisma/client";
import { jwtCheck } from '../jwtCheck';
import { sendMailDonate } from '../middleware/nodemailer';

const prisma = new PrismaClient()

const router = express.Router();

router.post("/", async (req,res) => {

    let {shelter, donation, shelterId, goalId, email} = req.body

    mercadopago.configure({access_token: process.env.ACCESS_TOKEN!})

    let preference: CreatePreferencePayload = {
        binary_mode: true,
        items: [
            {
                id: `${shelterId} ${goalId}`,
                title: `Donación para ${shelter}`,
                unit_price: donation,
                quantity: 1,
                description: email
            }
        ],
        payment_methods: {
            excluded_payment_types: [{
                id: "ticket"
            }]
        },
        back_urls: {success: `${process.env.URLMP}/mp`},
        auto_return: "approved",
    }

    mercadopago.preferences.create(preference).then((response) => {
        res.status(200).send({message: response.body.init_point})
    })
})

router.get('/feedback', async function (req, res) {
    try {
        let payment_id = req.query.payment_id
        console.log("paymend_id: ", payment_id)
        console.log("env: ", process.env)
    let {data} = await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, {headers: {Authorization: `Bearer ${process.env.ACCESS_TOKEN!}`}})
    console.log("data: ", data)

	
    let paymentID = await prisma.payment.findMany({where: {paymentId: data?.id.toString()}})

    if (data.status === "approved" && !paymentID.length) {
        let id = data.additional_info.items[0].id
        id = id.split(" ")
        let goalId = id[1]
        let shelterId = id[0]
        let shelter = await prisma.shelter.findUnique({where: {id: shelterId}})
        if (goalId !== "undefined") {
            let goal = await prisma.goal.findUnique({where: {id: goalId}})
            await prisma.payment.create({data: {paymentId: data.id.toString()}})
            await prisma.shelter.update({where: {id: shelterId}, data: {
                budget: shelter?.budget! + Number(data.additional_info.items[0].unit_price),
            }}),
            await prisma.goal.update({where: {id: goalId}, data: {
                budget: goal?.budget! + Number(data.additional_info.items[0].unit_price)
            }})
        }
        await prisma.payment.create({data: {paymentId: data.id.toString()}})
        await prisma.shelter.update({where: {id: shelterId}, data: {
            budget: shelter?.budget! + Number(data.additional_info.items[0].unit_price),
        }})
        

        sendMailDonate(data.additional_info.items[0].description, shelter?.name!)

        res.status(200).json({status:200,data: shelterId})
    } else {
        res.status(403).send("Failed payment")
    }
    } catch(e) {
        console.log(e)
    }
});

router.post('/plan', async (req, res) => {
    let {shelter, donation, id, email} = req.body

    mercadopago.configure({access_token: process.env.ACCESS_TOKEN!})

    let preference: CreatePreApprovalPayload = {
        reason: `Subscripción mensual para ${shelter}`,
        external_reference: id,
        auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: donation,
            currency_id: "ARS",
        },
        back_url: "http://localhost:3000/",
        payer_email: email
    }

    mercadopago.preapproval.create(preference).then((response) => {
        res.status(200).send({message: response.body.init_point})
    })
})

router.get("/feedback/plan", async (req, res) => {
    let payment_id = req.query.payment_id
    let {data} = await axios.get(`https://api.mercadopago.com/preapproval/${payment_id}`, {headers: {Authorization: `Bearer ${process.env.ACCESS_TOKEN!}`}})

    let paymentID = await prisma.payment.findMany({where: {paymentId: data.id.toString()}})

    if (data.status === "authorized" && !paymentID.length) {
        let id: string = data.external_reference
        let shelter = await prisma.shelter.findFirst({where: {id}})
        await prisma.payment.create({data: {paymentId: data.id.toString()}})
        await prisma.shelter.update({where: {id}, data: {
            budget: shelter?.budget! + Number(data.auto_recurring.transaction_amount)
        }})
        res.status(200).json({status:200,data: id})
    } else {
        res.status(403).send("Failed payment")
    }
})

export default router
