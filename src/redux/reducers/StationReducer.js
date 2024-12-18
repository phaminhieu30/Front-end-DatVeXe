import {SET_LIST_STATION, SET_STATION_DETAIL} from "../types/StationTypes";

const initialState = {
	listStation: [],
	stationDetail: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_LIST_STATION: {
			return {...state, listStation: action.listStation};
		}
		case SET_STATION_DETAIL: {
			return {...state, stationDetail: action.stationDetail};
		}
		default:
			return state;
	}
};
