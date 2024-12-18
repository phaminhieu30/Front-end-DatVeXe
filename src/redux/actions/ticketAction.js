import {history} from "../../App";
import {HIDE_LOADING, HIDE_LOADING_BUTTON, SET_LOADING} from "../types/LoadingTypes";
import _ from "lodash";
import {Breadcrumb, Card, Tabs, Avatar, Popconfirm, message, Button} from "antd";

import {ticketService} from "../services/ticketService";
import {SET_DETAIL_TICKET, SET_LIST_TICKET, SET_LIST_TICKET_TRIP, SET_TICKET_USER} from "../types/TicketTypes";
export const getTicketUser = (userId) => {
	return async (dispatch) => {
		try {
			const result = await ticketService.getTicketUser(userId);
			if (result.status == 200) {
				dispatch({
					type: SET_TICKET_USER,
					ticketUser: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getDetailTicket = (id) => {
	return async (dispatch) => {
		try {
			const result = await ticketService.getDetailTicket(id);
			if (result.status == 200) {
				dispatch({
					type: SET_DETAIL_TICKET,
					detailTicket: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const deleteTicket = (id) => {
	return async (dispatch) => {
		try {
			const result = await ticketService.deleteTicket(id);
			if (result.status == 200) {
				message.success("Xóa vé thành công");
				dispatch(getAllTicket());
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const cancelTicketUser = (ticketId) => {
	return async (dispatch, getState) => {
		try {
			const result = await ticketService.cancelTicket(ticketId);
			console.log(result);
			if (result.status == 200) {
				message.success("Hủy vé thành công");
				let user = getState().userReducer.userLogin;
				dispatch(getTicketUser(user.id));
				dispatch(getAllTicket());
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const confirmTicket = (id) => {
	return async (dispatch, getState) => {
		try {
			const result = await ticketService.confirmTicket(id);
			console.log(result);
			if (result.status == 200) {
				message.success("Xác nhận vé thành công");
				dispatch(getAllTicket());
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateTicket = (id, ticket) => {
	return async (dispatch, getState) => {
		try {
			const result = await ticketService.updateTicket(id, ticket);
			console.log(result);
			if (result.status == 200) {
				message.success("Cập nhật vé thành công");
				dispatch(getAllTicket());
			}
		} catch (error) {
			message.success("Cập nhật vé thất bại");
			console.log(error);
		}
	};
};

export const getAllTicket = () => {
	return async (dispatch, getState) => {
		try {
			const result = await ticketService.getAllTicket();
			console.log(result);
			if (result.status == 200) {
				dispatch({
					type: SET_LIST_TICKET,
					listTicket: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getAllTicketByTrip = (id) => {
	return async (dispatch, getState) => {
		try {
			const result = await ticketService.getAllTicketByTrip(id);
			console.log(result);
			if (result.status == 200) {
				dispatch({
					type: SET_LIST_TICKET_TRIP,
					listTicketTrip: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};
