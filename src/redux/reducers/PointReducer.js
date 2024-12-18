import {SET_POINT_DROPOFF, SET_POINT_PICKUP, SET_POINT, SET_POINT_DETAIL, SET_ADDRESS_POINT, SET_POINTPICK_DETAIL, SET_POINTDROP_DETAIL} from "../types/PointTypes";

const initialState = {
	listPointPickup: [],
	listPointDropoff: [],
	listPoint: [],
	pointDetail: {},
	PointPickDetail: {},
	PointDropDetail: {},
	address: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_POINT_PICKUP: {
			return {...state, listPointPickup: action.listPointPickup};
		}
		case SET_POINT_DROPOFF: {
			return {...state, listPointDropoff: action.listPointDropoff};
		}
		case SET_POINT: {
			return {...state, listPoint: action.listPoint};
		}
		case SET_POINT_DETAIL: {
			return {...state, pointDetail: action.pointDetail};
		}
		case SET_ADDRESS_POINT: {
			return {...state, address: action.address};
		}
		case SET_POINTPICK_DETAIL: {
			return {...state, PointPickDetail: action.PointPickDetail};
		}
		case SET_POINTDROP_DETAIL: {
			return {...state, PointDropDetail: action.PointDropDetail};
		}
		default:
			return state;
	}
};
