import TicketManager from "../dao/classes/ticket.dao.js";
import UserManager from "../dao/classes/user.dao.js";
import { sendEmail } from "../services/email.nodemailer.services.js";

const ticketManager = new TicketManager;
const userController = new UserManager

export const payTicketController = async (req, res) => {
    const { ticketId } = req.body;

    try {
        const ticket = await ticketManager.getTicketById(ticketId);

        if (!ticket) {
            return res.status(404).send({ message: "Ticket no encontrado" });
        }

        const updatedTicket = await ticketManager.updateTicketStatusToPaid(ticketId);

        const user = await userController.getUserById(updatedTicket.purchaser);

        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        const emailOptions = {
            to: user.email,
            subject: "ElArgentino - Gracias por tu compra",
            text: `Gracias por completar tu compra. El código de tu ticket es ${updatedTicket.code}.`,
            html: `<p>Gracias por completar tu compra. El código de tu ticket es <strong>${updatedTicket.code}</strong>.</p>`
        };

        await sendEmail(
            emailOptions.to,
            emailOptions.subject,
            emailOptions.text,
            emailOptions.html
        );

        res.status(200).render('thank-you', { ticket: updatedTicket });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};

