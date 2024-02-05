import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

import express from 'express'
import nodemailer from "nodemailer"
import path from 'path'

const port = process.env.PORT
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.get('/', function (req, res) {
    res.render(path.join(process.cwd(), '/public/index.html'))
})

app.get('/index', function (req, res) {
    res.render(path.join(process.cwd(), '/public/index.html'))
})

app.post('/subscribe', async function (req, res) {
    const d = new Date()
    let timeNow = d.toString()
    const userEmail = req.body.userEmail[0]
    console.log(userEmail)


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.LOGIN,
            pass: process.env.LOGKEY
        },
    });

    await transporter.sendMail({
        from: userEmail, // sender address
        to: process.env.HOSTEMAIL, // list of receivers
        subject: "It actually works ✔✔", // Subject line
        text: `Congratulations, the code ran successfuly and an email was sent!\nUser: ${userEmail}\nAt: ${timeNow}`, // plain text body
      })
      .then(info=>console.log("Message sent with ID: %s", info.messageId))
      .catch(console.error)
})


app.listen(port, function (err) {
    if (err) {
        console.log(`Error trying to connect to port ${err.message}`)
    } else {
        console.log(`Successful connection to port`)
    }
})
