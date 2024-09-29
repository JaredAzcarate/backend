import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/* Transportador de nodemailer con Gmail */
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/* Función para enviar correos electrónicos */
export const sendEmail = async (to, subject, text, html, attachments) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
        attachments
    };

    try {
        const info = await transport.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};
