import {GET_DETAIL_TRIP, GET_DETAIL_TRIPPASSENGER, GET_TRIP, GET_TRIP_PASSENGER, SET_TRIPPASSENGER_CREATE, SET_TRIP_CREATE} from "../types/TripTypes";

const initialState = {
	listTrip: [],
	listTripPassenger: [],
	tripDetail: {},
	tripPassengerDetail: {},
	tripCreated: {},
	tripPassengerCreated: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_TRIP: {
			return {...state, listTrip: action.listTrip};
		}
		case GET_DETAIL_TRIP: {
			return {...state, tripDetail: action.tripDetail};
		}
		case GET_TRIP_PASSENGER: {
			return {...state, listTripPassenger: action.listTripPassenger};
		}
		case GET_DETAIL_TRIPPASSENGER: {
			return {...state, tripPassengerDetail: action.tripPassengerDetail};
		}
		case SET_TRIP_CREATE: {
			return {...state, tripCreated: action.tripCreated};
		}
		case SET_TRIPPASSENGER_CREATE: {
			return {...state, tripPassengerCreated: action.tripPassengerCreated};
		}
		default:
			return state;
	}
};
