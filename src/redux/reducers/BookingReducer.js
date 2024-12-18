import {CANCEL_SORT_TIME, GET_IMG_VEHICLES, GET_PROVINCE, GET_TRIP_BY_USER, GET_TRIP_PASSENGER, GET_TRIP_PASSENGER2, OPEN_CLOSE_BOOKING, OPEN_CLOSE_DETAILS, SELECT_BOOKING_SEAT, SELECT_TRIP, SET_DROPOFF_PICKUP, SET_SORT_TIME, TRIP_RENDER} from "../types/BookingTypes";
import {message} from "antd";
import {FILTER_TRIPPASSENGER_TIME} from "../types/TripTypes";

const initialState = {
	listProvince: [],
	tripByUser: {},
	tripSearch: {
		fromStation: "",
		toStation: "",
		startTime: "",
	},
	tripRender: {},
	listTripPassenger: [],
	listTripPassenger2: [],
	listSeatSelected: [],
	dropoff: "",
	pickup: "",
	isSort: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_PROVINCE: {
			return {...state, listProvince: action.listProvince};
		}
		case GET_TRIP_BY_USER: {
			return {
				...state,
				tripByUser: action.tripByUser[0],
			};
		}
		case SELECT_TRIP: {
			let tripSearchNew = {...state.tripSearch};
			tripSearchNew[action.key] = action.value;
			return {
				...state,
				tripSearch: tripSearchNew,
			};
		}
		case GET_TRIP_PASSENGER: {
			return {...state, listTripPassenger: action.listTripPassenger};
		}
		case GET_TRIP_PASSENGER2: {
			return {...state, listTripPassenger2: action.listTripPassenger};
		}
		case OPEN_CLOSE_BOOKING: {
			let arrListTrip = [...state.listTripPassenger];
			let indexOpen = arrListTrip.findIndex((item) => item.isOpen);
			if (indexOpen == -1) {
				let index = arrListTrip.findIndex((item) => item.id === action.id);
				if (index !== -1) {
					if (!arrListTrip[index].openDetail) {
						arrListTrip[index].openBooking = true;
						arrListTrip[index].isOpen = true;
					}
				}
			} else {
				let index = arrListTrip.findIndex((item) => item.id === action.id);
				arrListTrip[index].openBooking = false;
				arrListTrip[index].isOpen = false;
				state.listSeatSelected = [];
				state.dropoff = "";
				state.pickup = "";
			}

			return {...state, listTripPassenger: arrListTrip};
		}
		case OPEN_CLOSE_DETAILS: {
			let arrListTrip = [...state.listTripPassenger];
			let indexOpen = arrListTrip.findIndex((item) => item.isOpen);
			if (indexOpen == -1) {
				let index = arrListTrip.findIndex((item) => item.id === action.id);
				if (index !== -1) {
					if (!arrListTrip[index].openBooking) {
						arrListTrip[index].openDetail = true;
						arrListTrip[index].isOpen = true;
					}
				}
			} else {
				let index = arrListTrip.findIndex((item) => item.id === action.id);
				arrListTrip[index].openDetail = false;
				arrListTrip[index].isOpen = false;
			}

			return {...state, listTripPassenger: arrListTrip};
		}
		case SELECT_BOOKING_SEAT: {
			let arrSeatSelectcopy = [...state.listSeatSelected];
			let index = arrSeatSelectcopy.findIndex((item) => item.id === action.seat.id);
			if (index != -1) {
				arrSeatSelectcopy.splice(index, 1);
			} else {
				if (arrSeatSelectcopy.length < 3) {
					arrSeatSelectcopy.push(action.seat);
				} else {
					message.error("Chỉ được đặt tối đa 3 ghế");
				}
			}
			return {...state, listSeatSelected: arrSeatSelectcopy};
		}
		case TRIP_RENDER: {
			return {...state, tripRender: action.tripRender};
		}
		case SET_DROPOFF_PICKUP: {
			if (action.title == "pickup") {
				state.pickup = action.pickup;
			} else {
				state.dropoff = action.dropoff;
			}
			return {...state};
		}
		case "reset_pickdrop": {
			state.dropoff = "";
			state.pickup = "";
			return {...state};
		}
		case FILTER_TRIPPASSENGER_TIME: {
			let listTripPassengerFilter = [...state.listTripPassenger];
			listTripPassengerFilter = listTripPassengerFilter.filter((item) => item.startTime >= action.timeStart && item.startTime <= action.timeEnd);
			if (listTripPassengerFilter.length > 0) {
				return {...state, listTripPassenger: listTripPassengerFilter};
			} else {
				message.error("Không có chuyến nào");
			}
			return {...state};
		}
		case SET_SORT_TIME: {
			return {...state, isSort: true};
		}
		case CANCEL_SORT_TIME: {
			return {...state, isSort: false};
		}
		default:
			return state;
	}
};
