import {payService} from "../services/payService";
import CryptoJS from "crypto-js";
import {history} from "../../App";
import {Redirect, Route} from "react-router-dom";
import {bookingTicketAction} from "./bookingAction";
export const PayAction = (ticketBooking, passenger) => {
	return async (dispatch) => {
		try {
			const ticketupdate = {...ticketBooking, passenger: passenger};
			const result = await payService.pay(ticketupdate);
			console.log(result);
			if (result.status == 200) {
				window.location.href = result.data.payUrl;
				window.location.replace(result.data.payUrl);
			}
		} catch (error) {
			console.log(error);
		}
	};
};
