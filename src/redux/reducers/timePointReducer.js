import {SET_TIMEPOINTBOOKING_TRIP, SET_TIMEPOINT_DETAIL, SET_TIMEPOINT_TRIP} from "../types/TimePointTypes";

const initialState = {
	timePointTrip: [],
	timePointBooking: [],
	timepointDetail: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TIMEPOINT_TRIP: {
			return {...state, timePointTrip: action.timePointTrip};
		}
		case SET_TIMEPOINTBOOKING_TRIP: {
			return {...state, timePointBooking: action.timePointBooking};
		}
		case SET_TIMEPOINT_DETAIL: {
			return {...state, timepointDetail: action.timepointDetail};
		}
		default:
			return state;
	}
};
