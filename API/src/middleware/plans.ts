import { PrismaClient } from "@prisma/client"
import axios from "axios"

let prisma = new PrismaClient()

const verifyPayment = async () => {
    let shelters = await prisma.payment.findMany({select: {paymentId: true}})
    let filterShelter = shelters.filter((id) => id.paymentId.length > 10)
    let date = new Date().toISOString()
    let nowArr = date.split("-")
    let now = `${nowArr[0]} ${nowArr[1]} ${nowArr[2].split("T")[0]}`

    try {
        let newArr = []
        for (let i=0; i<filterShelter.length; i++) {
            let {data} = await axios.get(`https://api.mercadopago.com/preapproval/${filterShelter[i].paymentId}`, {headers: {Authorization: `Bearer ${process.env.ACCESS_TOKEN!}`}})
            newArr.push(data)
        }

        newArr = newArr.filter((res) => res.next_payment_date).filter((res) => res.status === "authorized")
        
        for (let i=0; i<newArr.length; i++) {
            let newDate = newArr[i].next_payment_date.split("-")
            newArr[i].next_payment_date = `${newDate[0]} ${newDate[1]} ${newDate[2].split("T")[0]}`
            "2022 12 23"
            "2022 12 23"
        }
        
        for (let i=0; i<newArr.length; i++) {
            if (newArr[i].next_payment_date <= now) {
                let s = await prisma.shelter.findUnique({where: {id: newArr[i].external_reference}})
                await prisma.shelter.update({where: {id: newArr[i].external_reference}, data: {budget: s?.budget + newArr[i].auto_recurring.transaction_amount}})
            }
        }
    } catch (err) {
        console.log(err)
    }
}

export default verifyPayment