import ticketModel from "../models/ticket.model.js";


export default class TicketManager {

    getTicketsByUserId = async (userId) => {
        try {
            const result = await ticketModel.find({ purchaser: userId }).lean();
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getTicketById = async (ticketId) => {
        try {
            const result = await ticketModel.findById(ticketId);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateTicketStatusToPaid = async (ticketId) => {
        try {
            const ticket = await ticketModel.findByIdAndUpdate(
                ticketId,
                { status: "paid" },
                { new: true }
            );
            return ticket;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    createNewTicket = async (ticket) => {
        try {
            const result = await ticketModel.create(ticket);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
