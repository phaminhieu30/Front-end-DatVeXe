import {baseService} from "./BaseService";

export class TicketService extends baseService {
	constructor() {
		super();
	}
	getTicketUser = (userId) => {
		return this.get(`/ticket?userId=${userId}`);
	};
	getDetailTicket = (id) => {
		return this.get(`/ticket/${id}`);
	};
	cancelTicket = (id) => {
		return this.put(`/ticket/cancel/${id}`);
	};
	deleteTicket = (id) => {
		return this.delete(`/ticket/${id}`);
	};
	confirmTicket = (id) => {
		return this.put(`/ticket/confirm/${id}`);
	};
	updateTicket = (id, ticket) => {
		return this.put(`/ticket/${id}`, ticket);
	};
	getAllTicket = () => {
		return this.get(`/ticket/getall`);
	};
	getAllTicketByTrip = (id) => {
		return this.get(`/ticket/trip?tripPassengerId=${id}`);
	};
}
export const ticketService = new TicketService();
