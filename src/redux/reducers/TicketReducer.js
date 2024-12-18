import {SET_TICKET_USER, SET_LIST_TICKET, SET_DETAIL_TICKET, SET_LIST_TICKET_TRIP, TICKET_BOOKING, CHANGE_PICK_TICKET, CHANGE_DROP_TICKET} from "../types/TicketTypes";

const initialState = {
	ticketUser: [],
	listTicket: [],
	detailTicket: {},
	listTicketTrip: [],
	ticketBooking: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TICKET_USER: {
			return {...state, ticketUser: action.ticketUser};
		}
		case SET_LIST_TICKET: {
			return {...state, listTicket: action.listTicket};
		}
		case SET_DETAIL_TICKET: {
			return {...state, detailTicket: action.detailTicket};
		}
		case SET_LIST_TICKET_TRIP: {
			return {...state, listTicketTrip: action.listTicketTrip};
		}
		case TICKET_BOOKING: {
			return {...state, ticketBooking: action.ticketBooking};
		}
		case CHANGE_PICK_TICKET: {
			let ticketBookingupdate = {...state.ticketBooking};
			ticketBookingupdate.pointPickup = action.pointPickup;
			return {...state, ticketBooking: ticketBookingupdate};
		}
		case CHANGE_DROP_TICKET: {
			let ticketBookingupdate = {...state.ticketBooking};
			ticketBookingupdate.pointDropoff = action.pointDropoff;
			return {...state, ticketBooking: ticketBookingupdate};
		}
		default:
			return state;
	}
};
