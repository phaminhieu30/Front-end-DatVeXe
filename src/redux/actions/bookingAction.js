import {history} from "../../App";
import {STATUS_CODE} from "../../util/settings/config";
import {bookingService} from "../services/BookingService";
import _ from "lodash";
import {GET_IMG_VEHICLES, GET_PROVINCE, GET_TRIP_BY_USER, GET_TRIP_PASSENGER, SELECT_BOOKING_SEAT} from "../types/BookingTypes";
import {HIDE_LOADING, HIDE_LOADING_BUTTON, SET_LOADING} from "../types/LoadingTypes";
import {PayAction} from "./payAction";
import {message} from "antd";

export const getProvinceAction = () => {
	return async (dispatch) => {
		try {
			const result = await bookingService.getProvince();
			if (result.status == 201) {
				dispatch({
					type: GET_PROVINCE,
					listProvince: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const getTripPassengerAction = (id) => {
	return async (dispatch) => {
		dispatch({
			type: SET_LOADING,
		});

		const result = await bookingService.getTripPassenger(id);
		if (result.status == 200) {
			const dataNew = result.data.map((item, index) => {
				return {...item, openDetail: false, openBooking: false, isOpen: false};
			});
			dispatch({
				type: GET_TRIP_PASSENGER,
				listTripPassenger: dataNew,
			});
		}

		setTimeout(function () {
			dispatch({
				type: HIDE_LOADING,
			});
		}, 500);
	};
};

export const getTripByUserAction = (trip) => {
	return async (dispatch) => {
		const result = await bookingService.getTripByUser(trip);
		console.log("sd", result);
		if (result.status == 200) {
			dispatch({
				type: GET_TRIP_BY_USER,
				tripByUser: result.data,
			});
			let first = "NoTrip";
			if (!_.isEmpty(result.data[0])) {
				first = result.data[0]?.id;
			}
			history.push(`/booking/${first}/${trip.fromStation}/${trip.toStation}/${trip.startTime}`);
			dispatch(getTripPassengerAction(result.data[0]?.id));
			dispatch({
				type: HIDE_LOADING_BUTTON,
			});
		}
	};
};
export const bookingSeatAction = (seat) => {
	return async (dispatch, getState) => {
		const listSeatSelected = getState().BookingReducer.listSeatSelected;

		dispatch({
			type: SELECT_BOOKING_SEAT,
			seat: seat,
		});
	};
};

export const bookingTicketAction = (ticket, passenger) => {
	return async (dispatch) => {
		try {
			const result = await bookingService.booking(ticket);
			console.log(result);
			if (result.status == 200) {
				message.success("đặt vé thành công");
				dispatch(PayAction(ticket, passenger));
			} else {
				message.error("đặt vé không thành công vì bạn đã đặt vé cho chuyến này rồi");
			}
		} catch (error) {
			message.error("đặt vé không thành công vì bạn đã đặt vé cho chuyến này rồi");
			console.log(error);
		}
	};
};
