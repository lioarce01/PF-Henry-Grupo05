import { Response } from "express"
import nodemailer from "nodemailer"

export const sendMailCreate = (name: string, email: string) => {
    let res: Response
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "samirjose675",
            pass: process.env.NODEMAILER
        }
    })

    let mailOptions = {
        from: "samirjose675@gmail.com",
        to: email,
        subject: "Paws Founding | Welcome",
        html: `${name}, welcome to Paws Founding.`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send(error?.message) 
        } else {
            res.status(200).send("Email sent")
        }
    })
}

export const sendMailDonate = (email: string, shelter: string) => {
    let res: Response
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "samirjose675",
            pass: process.env.NODEMAILER
        }
    })

    let mailOptions = {
        from: "samirjose675@gmail.com",
        to: email,
        subject: "Paws Founding | Donation",
        html: `Thank you for donating to ${shelter}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send(error?.message) 
        } else {
            res.status(200).send("Email sent")
        }
    })
}