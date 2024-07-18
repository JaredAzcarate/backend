import { Router } from "express";
import { sendEmail } from "../services/email.nodemailer.services.js";

const router = Router()

router.get('/send', async (req, res) => {

    const { to, subject, text, html, attachments } = req.body;

    try {

        await sendEmail(to, subject, text, html, attachments)

        res.status(200).send({ status: 'success', message: 'Email sent successfully' });

    } catch (error) {

        res.status(500).send({ message: error.message });

    }
})

export default router