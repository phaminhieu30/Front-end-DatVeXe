import {bindActionCreators} from "redux";
import {CANCEL_PREVIEW, GET_DETAIL_SEAT, HANDLE_CHANGE_FILE, HANDLE_PREVIEW, SET_FILELIST, SET_LIST_VEHICLE, SET_VEHICLE_DETAIL, GET_IMAGE_VEHICLE, GET_SEAT_VEHICLE, SET_VEHICLE_SELECT} from "../types/VehicleTypes";

const initialState = {
	listVehicle: [],
	listSelectVehicle: [],
	vehicleDetail: {},
	fileImageVehicle: {
		previewVisible: false,
		previewImage: "",
		previewTitle: "",
		fileList: [],
	},
	seatDetail: {},
	listImageVehicle: [],
	listSeatVehicle: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_LIST_VEHICLE: {
			return {...state, listVehicle: action.listVehicle};
		}
		case SET_VEHICLE_DETAIL: {
			return {...state, vehicleDetail: action.vehicleDetail};
		}
		case SET_FILELIST: {
			let fileImageVehicleNew = {...state.fileImageVehicle};
			fileImageVehicleNew.fileList = action.fileList;
			return {...state, fileImageVehicle: fileImageVehicleNew};
		}
		case CANCEL_PREVIEW: {
			let fileImageVehicleNew = {...state.fileImageVehicle};
			fileImageVehicleNew.previewVisible = false;
			return {...state, fileImageVehicle: fileImageVehicleNew};
		}
		case HANDLE_PREVIEW: {
			let fileImageVehicleNew = {...state.fileImageVehicle};
			fileImageVehicleNew.previewImage = action.previewImage;
			fileImageVehicleNew.previewVisible = true;
			fileImageVehicleNew.previewTitle = action.previewTitle;
			return {...state, fileImageVehicle: fileImageVehicleNew};
		}
		case HANDLE_CHANGE_FILE: {
			let fileImageVehicleNew = {...state.fileImageVehicle};
			fileImageVehicleNew.fileList = action.fileList;
			return {...state, fileImageVehicle: fileImageVehicleNew};
		}
		case GET_DETAIL_SEAT: {
			return {...state, seatDetail: action.seatDetail};
		}
		case GET_IMAGE_VEHICLE: {
			return {...state, listImageVehicle: action.listImageVehicle};
		}
		case GET_SEAT_VEHICLE: {
			return {...state, listSeatVehicle: action.listSeatVehicle};
		}
		case SET_VEHICLE_SELECT: {
			return {...state, listSelectVehicle: action.listSelectVehicle};
		}
		default:
			return state;
	}
};
