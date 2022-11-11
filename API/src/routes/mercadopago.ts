import { CreatePreferencePayload} from 'mercadopago/models/preferences/create-payload.model';
import express from 'express';
import mercadopago from "mercadopago"
import axios from "axios"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const router = express.Router();

router.post("/", async (req,res) => {

    let {shelter, donation, id} = req.body

    mercadopago.configure({access_token: process.env.ACCESS_TOKEN!})

    let preference: CreatePreferencePayload = {
        binary_mode: true,
        items: [
            {
                id: id,
                title: `Donación para ${shelter}`,
                unit_price: donation,
                quantity: 1
            }
        ],
        payment_methods: {
            excluded_payment_types: [{
                id: "ticket"
            }]
        },
        back_urls: {success: "http://localhost:3000/mp"},
        auto_return: "approved",

    }

    mercadopago.preferences.create(preference).then((response) => {
        res.status(200).send(response.body.init_point)
    })
})

router.get('/feedback', async function (req, res) {
    let payment_id = req.query.payment_id
	let {data} = await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, {headers: {Authorization: `Bearer ${process.env.ACCESS_TOKEN!}`}})
    console.log(data)
    let paymentID = await prisma.payment.findMany({where: {paymentId: data.id.toString()}})

    if (data.status === "approved" && !paymentID.length) {
        let id: string = data.additional_info.items[0].id
        let shelter = await prisma.shelter.findUnique({where: {id}})
        await prisma.payment.create({data: {paymentId: data.id.toString()}})
        await prisma.shelter.update({where: {id}, data: {
            budget: shelter?.budget! + Number(data.additional_info.items[0].unit_price)
        }})
        res.status(200).send("Approved payment")
    } else {
        res.status(403).send("Failed payment")
    }
});

export default router