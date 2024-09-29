import TicketManager from "../dao/classes/ticket.dao.js";
import { sendEmail } from "../services/email.nodemailer.services.js";

const ticketManager = new TicketManager;

export const payTicketController = async (req, res) => {
    const { ticketId } = req.body;

    try {
        const ticket = await ticketManager.getTicketById(ticketId);

        if (!ticket) {
            return res.status(404).send({ message: "Ticket no encontrado" });
        }

        /* actualizar el estado del ticket a 'paid' */
        const updatedTicket = await ticketManager.updateTicketStatusToPaid(ticketId);

        /* enviar el correo de agradecimiento */
        const emailOptions = {
            to: updatedTicket.purchaser,
            subject: "Gracias por tu compra",
            text: `Gracias por completar tu compra. El código de tu ticket es ${updatedTicket.code}.`,
            html: `<p>Gracias por completar tu compra. El código de tu ticket es <strong>${updatedTicket.code}</strong>.</p>`
        };

        await sendEmail(
            emailOptions.to,
            emailOptions.subject,
            emailOptions.text,
            emailOptions.html
        );

        res.status(200).redirect('/api/users/profile/tickets/' + ticket.purchaser);   

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};
