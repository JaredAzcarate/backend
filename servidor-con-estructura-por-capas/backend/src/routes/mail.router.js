import { Router } from "express";
import { sendEmail } from "../services/emailService.nodemailer.js";

const router = Router()

router.get('/send', async (req, res) => {

    const { to, subject, text, html } = req.body;

    try {

        await sendEmail(to, subject, text, html)

        res.status(200).send({ status: 'success', message: 'Email sent successfully' });

    } catch (error) {

        res.status(500).send({ message: error.message });

    }
})

export default router