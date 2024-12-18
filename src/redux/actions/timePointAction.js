import {message} from "antd";
import {timePointService} from "../services/timePointService";
import {HIDE_LOADING_SPIN, SET_LOADING_SPIN, SET_RESULT} from "../types/LoadingTypes";
import {SET_POINTDROP_DETAIL, SET_POINTPICK_DETAIL} from "../types/PointTypes";
import {SET_TIMEPOINTBOOKING_TRIP, SET_TIMEPOINT_DETAIL, SET_TIMEPOINT_TRIP} from "../types/TimePointTypes";

export const getTimePointTripAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await timePointService.getTimePointTrip(id);
			if (result.status == 200) {
				dispatch({type: SET_LOADING_SPIN});
				dispatch({
					type: SET_TIMEPOINT_TRIP,
					timePointTrip: result.data,
				});
				setTimeout(function () {
					dispatch({
						type: HIDE_LOADING_SPIN,
					});
				}, 500);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getTimePointBookingTripAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await timePointService.getTimePointTrip(id);
			if (result.status == 200) {
				dispatch({
					type: SET_TIMEPOINTBOOKING_TRIP,
					timePointBooking: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const createTimePointTripAction = (timepoint) => {
	return async (dispatch) => {
		try {
			const result = await timePointService.createTimePointTrip(timepoint);

			if (result.status == 200) {
				message.success("Tạo điểm thành công");
				dispatch({
					type: SET_RESULT,
				});
			}
		} catch (error) {
			message.error("Tạo điểm thất bại");
			console.log(error);
		}
	};
};

export const getDetailTimePointPickTripAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await timePointService.getDetailTimePointTrip(id);
			console.log("result", result);
			if (result.status == 200) {
				dispatch({
					type: SET_POINTPICK_DETAIL,
					PointPickDetail: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};
export const getDetailTimePointDropTripAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await timePointService.getDetailTimePointTrip(id);

			if (result.status == 200) {
				dispatch({
					type: SET_POINTDROP_DETAIL,
					PointDropDetail: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getDetailTimePointTripAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await timePointService.getDetailTimePointTrip(id);

			if (result.status == 200) {
				dispatch({
					type: SET_TIMEPOINT_DETAIL,
					timepointDetail: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};
