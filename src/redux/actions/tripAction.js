import {message} from "antd";
import {tripService} from "../services/tripService";
import {GET_TRIP_PASSENGER2} from "../types/BookingTypes";
import {HIDE_LOADING, HIDE_LOADING_SPIN, HIDE_LOADING_SPIN_FILTER, SET_LOADING, SET_LOADING_SPIN, SET_LOADING_SPIN_FILTER} from "../types/LoadingTypes";
import {GET_DETAIL_TRIP, GET_DETAIL_TRIPPASSENGER, GET_TRIP, GET_TRIP_PASSENGER, SET_TRIPPASSENGER_CREATE, SET_TRIP_CREATE} from "../types/TripTypes";
import _ from "lodash";
import {GET_DETAIL_USER} from "../types/userTypes";
import {getPointPickUpAction} from "./pointAction";

export const getTripAction = () => {
	return async (dispatch) => {
		try {
			const result = await tripService.getTrip();
			console.log(result);
			if (result.status == 200) {
				dispatch({
					type: GET_TRIP,
					listTrip: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const createTripAction = (trip, next) => {
	return async (dispatch) => {
		try {
			const result = await tripService.createTrip(trip);
			console.log(result);
			if (result.status == 200) {
				message.success("Tạo trip thành công");
				dispatch({
					type: SET_TRIP_CREATE,
					tripCreated: result.data,
				});
				next();
			}
		} catch (error) {
			message.error("Tạo trip không thành công");
			console.log(error);
		}
	};
};

export const createTripPassengerAction = (tripPassenger, next) => {
	return async (dispatch, getState) => {
		try {
			const result = await tripService.createTripPassenger(tripPassenger);
			console.log(result);
			if (result.status == 200) {
				message.success("Phân nhà xe cho chuyến đi thành công");
				dispatch({
					type: SET_TRIPPASSENGER_CREATE,
					tripPassengerCreated: result.data,
				});
				next();
			}
		} catch (error) {
			message.error("Phân nhà xe cho chuyến đi không thành công");
			console.log(error);
		}
	};
};

export const getDetailTripAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await tripService.getDetailTrip(id);
			console.log(result);
			if (result.status == 200) {
				dispatch({
					type: GET_DETAIL_TRIP,
					tripDetail: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getDetailTripPassengerAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await tripService.getDetailTripPassenger(id);
			console.log("api detail trip passenger", result);
			if (result.status == 200) {
				dispatch({
					type: GET_DETAIL_TRIPPASSENGER,
					tripPassengerDetail: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getTripPassengerAction = (tripId) => {
	return async (dispatch) => {
		try {
			const result = await tripService.getTripPassenger(tripId);
			console.log(result);
			if (result.status == 200) {
				const dataNew = result.data.map((item, index) => {
					return {...item, openDetail: false, openBooking: false, isOpen: false};
				});
				dispatch({
					type: GET_TRIP_PASSENGER,
					listTripPassenger: dataNew,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getTripPassenger2Action = (tripId) => {
	return async (dispatch) => {
		try {
			const result = await tripService.getTripPassenger(tripId);
			console.log(result);
			if (result.status == 200) {
				const dataNew = result.data.map((item, index) => {
					return {...item, openDetail: false, openBooking: false, isOpen: false};
				});
				dispatch({
					type: GET_TRIP_PASSENGER2,
					listTripPassenger: dataNew,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getAllTripPassengerAction = () => {
	return async (dispatch) => {
		try {
			const result = await tripService.getAllTripPassenger();
			console.log(result);
			if (result.status == 200) {
				dispatch({
					type: GET_TRIP_PASSENGER,
					listTripPassenger: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateTripPassengerAction = (tripPassenger, id) => {
	return async (dispatch) => {
		try {
			const result = await tripService.updateTripPassenger(tripPassenger, id);
			console.log(result);
			if (result.status == 200) {
				message.success("update chuyến xe thành công");
				dispatch(getTripPassengerAction(tripPassenger.tripId));
			}
		} catch (error) {
			message.error("update chuyến xe thất bại");
			console.log(error);
		}
	};
};

export const deleteTripPassengerAction = (tripPassenger) => {
	return async (dispatch) => {
		try {
			const result = await tripService.deleteTripPassenger(tripPassenger.id);
			console.log(result);
			if (result.status == 200) {
				message.success("xóa chuyến xe thành công");
				dispatch(getTripPassengerAction(tripPassenger.tripId));
			}
		} catch (error) {
			message.error("update chuyến xe thất bại");
			console.log(error);
		}
	};
};

export const confirmTripPassengerAction = (tripPassenger, status) => {
	return async (dispatch) => {
		try {
			let statusObj = {
				statusConfirm: status,
			};
			const result = await tripService.confirmTripPassenger(tripPassenger.id, statusObj);
			console.log(result);
			if (result.status == 200) {
				message.success("Xác nhận chuyến xe thành công");
				dispatch(getTripPassengerAction(tripPassenger.tripId));
			}
		} catch (error) {
			message.error("Xác nhận chuyến xe thất bại");
			console.log(error);
		}
	};
};

//SORT
export const SortPriceTripPassengerAction = (tripSort) => {
	return async (dispatch, getState) => {
		let listTripPassenger = getState().BookingReducer.listTripPassenger;
		if (listTripPassenger.length > 0) {
			dispatch({
				type: SET_LOADING_SPIN_FILTER,
			});
			if (tripSort.type == "DESC") {
				listTripPassenger = listTripPassenger.sort((first, second) => 0 - (first.passenger.price > second.passenger.price ? 1 : -1));

				dispatch({
					type: GET_TRIP_PASSENGER,
					listTripPassenger: listTripPassenger,
				});
			} else {
				listTripPassenger = listTripPassenger.sort((first, second) => 0 - (first.passenger.price > second.passenger.price ? -1 : 1));

				dispatch({
					type: GET_TRIP_PASSENGER,
					listTripPassenger: listTripPassenger,
				});
			}
			setTimeout(function () {
				dispatch({
					type: HIDE_LOADING_SPIN_FILTER,
				});
			}, 500);
		} else {
			message.error("Không có chuyến nào để sắp xếp");
		}
	};
};

export const SortTimeTripPassengerAction = (tripSort) => {
	return async (dispatch, getState) => {
		let listTripPassenger = getState().BookingReducer.listTripPassenger;
		if (listTripPassenger.length > 0) {
			dispatch({
				type: SET_LOADING_SPIN_FILTER,
			});
			if (tripSort.type == "DESC") {
				listTripPassenger = listTripPassenger.sort((first, second) => 0 - (first.startTime > second.startTime ? 1 : -1));

				dispatch({
					type: GET_TRIP_PASSENGER,
					listTripPassenger: listTripPassenger,
				});
			} else {
				listTripPassenger = listTripPassenger.sort((first, second) => 0 - (first.startTime > second.startTime ? -1 : 1));

				dispatch({
					type: GET_TRIP_PASSENGER,
					listTripPassenger: listTripPassenger,
				});
			}
			setTimeout(function () {
				dispatch({
					type: HIDE_LOADING_SPIN_FILTER,
				});
			}, 500);
		} else {
			message.error("Không có chuyến nào để sắp xếp");
		}
	};
};

//

// FILTER

export const FilterTimeTripPassengerAction = (timeFilter) => {
	return async (dispatch, getState) => {
		dispatch({
			type: SET_LOADING_SPIN_FILTER,
		});
		let isSort = getState().BookingReducer.isSort;
		const result = await tripService.FilterTimeTripPassenger(timeFilter);
		if (result.status == 200) {
			if (isSort) {
				const dataNew = result.data.map((item, index) => {
					return {...item, openDetail: false, openBooking: false, isOpen: false};
				});
				dispatch({
					type: GET_TRIP_PASSENGER,
					listTripPassenger: dataNew,
				});
			} else {
				dispatch(getTripPassengerAction(timeFilter.tripId));
			}
		}

		setTimeout(function () {
			dispatch({
				type: HIDE_LOADING_SPIN_FILTER,
			});
		}, 500);
	};
};

export const FilterTypeTripPassengerAction = (type) => {
	return async (dispatch, getState) => {
		let listTripPassenger = getState().BookingReducer.listTripPassenger;
		let isSort = getState().BookingReducer.isSort;
		if (listTripPassenger.length > 0) {
			dispatch({
				type: SET_LOADING_SPIN_FILTER,
			});
			listTripPassenger = listTripPassenger.filter((item) => item.passenger.confirmType === type);
			dispatch({
				type: GET_TRIP_PASSENGER,
				listTripPassenger: listTripPassenger,
			});
			setTimeout(function () {
				dispatch({
					type: HIDE_LOADING_SPIN_FILTER,
				});
			}, 500);
		} else {
			message.error("Không có chuyến nào để lọc");
		}
	};
};

export const FilterPriceTripPassengerAction = (arrMinMax) => {
	return async (dispatch, getState) => {
		let listTripPassenger = getState().BookingReducer.listTripPassenger;
		if (listTripPassenger.length > 0) {
			dispatch({
				type: SET_LOADING_SPIN_FILTER,
			});
			listTripPassenger = listTripPassenger.filter((item) => item.passenger.price >= arrMinMax[0] && item.passenger.price <= arrMinMax[1]);
			dispatch({
				type: GET_TRIP_PASSENGER,
				listTripPassenger: listTripPassenger,
			});
			setTimeout(function () {
				dispatch({
					type: HIDE_LOADING_SPIN_FILTER,
				});
			}, 500);
		} else {
			message.error("Không có chuyến nào để lọc");
		}
	};
};

export const FilterBlankTripPassengerAction = (number) => {
	return async (dispatch, getState) => {
		let listTripPassenger = getState().BookingReducer.listTripPassenger;
		if (listTripPassenger.length > 0) {
			dispatch({
				type: SET_LOADING_SPIN_FILTER,
			});
			listTripPassenger = listTripPassenger.filter((item) => {
				let numberBlank = item.vehicle.seatVehicle.filter((x) => x.status == "chưa đặt").length;
				if (number < numberBlank) {
					return item;
				}
			});
			dispatch({
				type: GET_TRIP_PASSENGER,
				listTripPassenger: listTripPassenger,
			});
			setTimeout(function () {
				dispatch({
					type: HIDE_LOADING_SPIN_FILTER,
				});
			}, 500);
		} else {
			message.error("Không có chuyến nào để lọc");
		}
	};
};

export const FilterPassengerTripPassengerAction = (passengerId) => {
	return async (dispatch, getState) => {
		let listTripPassenger = getState().BookingReducer.listTripPassenger;
		if (listTripPassenger.length > 0) {
			dispatch({
				type: SET_LOADING_SPIN_FILTER,
			});
			listTripPassenger = listTripPassenger.filter((item) => item.passengerId == passengerId);
			dispatch({
				type: GET_TRIP_PASSENGER,
				listTripPassenger: listTripPassenger,
			});
			setTimeout(function () {
				dispatch({
					type: HIDE_LOADING_SPIN_FILTER,
				});
			}, 500);
		} else {
			message.error("Không có chuyến nào để lọc");
		}
	};
};

export const FilterSeatTripPassengerAction = (type) => {
	return async (dispatch, getState) => {
		let listTripPassenger = getState().BookingReducer.listTripPassenger;
		if (listTripPassenger.length > 0) {
			dispatch({
				type: SET_LOADING_SPIN_FILTER,
			});
			listTripPassenger = listTripPassenger.filter((item) => {
				let index = item.vehicle.seatVehicle.findIndex((obj) => obj.type == type && obj.status == "chưa đặt");
				if (index !== -1) {
					return item;
				}
			});
			dispatch({
				type: GET_TRIP_PASSENGER,
				listTripPassenger: listTripPassenger,
			});
			setTimeout(function () {
				dispatch({
					type: HIDE_LOADING_SPIN_FILTER,
				});
			}, 500);
		} else {
			message.error("Không có chuyến nào để lọc");
		}
	};
};

export const FilterRateTripPassengerAction = (rate) => {
	return async (dispatch, getState) => {
		let listTripPassenger = getState().BookingReducer.listTripPassenger;

		if (listTripPassenger.length > 0) {
			dispatch({
				type: SET_LOADING_SPIN_FILTER,
			});
			listTripPassenger = listTripPassenger.filter((item) => {
				let avgRatePassenger = _.meanBy(item.passenger.passengerRate, (rate) => rate.numberRate).toFixed(2);
				if (rate < avgRatePassenger) {
					return item;
				}
			});
			dispatch({
				type: GET_TRIP_PASSENGER,
				listTripPassenger: listTripPassenger,
			});
			setTimeout(function () {
				dispatch({
					type: HIDE_LOADING_SPIN_FILTER,
				});
			}, 500);
		} else {
			message.error("Không có chuyến nào để lọc");
		}
	};
};

//
