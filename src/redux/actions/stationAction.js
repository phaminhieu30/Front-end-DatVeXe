import {stationService} from "../services/StationService";
import {SET_LIST_STATION, SET_STATION_DETAIL} from "../types/StationTypes";
import {message} from "antd";

export const getListStationAction = () => {
	return async (dispatch) => {
		try {
			const result = await stationService.getListStation();
			if (result.status == 200) {
				dispatch({
					type: SET_LIST_STATION,
					listStation: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getDetailStationAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await stationService.getDetailStation(id);
			if (result.status == 200) {
				dispatch({
					type: SET_STATION_DETAIL,
					stationDetail: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateStationAction = (id, station) => {
	return async (dispatch) => {
		try {
			const result = await stationService.updateStation(id, station);
			if (result.status == 200) {
				message.success("update station thành công");
				dispatch(getListStationAction());
			}
		} catch (error) {
			message.error("update station thất bại");
			console.log(error);
		}
	};
};

export const createStationAction = (station) => {
	return async (dispatch) => {
		try {
			const result = await stationService.createStation(station);
			if (result.status == 200) {
				message.success("Thêm station thành công");
				dispatch(getListStationAction());
			}
		} catch (error) {
			message.error("Thêm station thất bại");
			console.log(error);
		}
	};
};

export const deleteStationAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await stationService.deleteStation(id);
			if (result.status == 200) {
				message.success("delete station thành công");
				dispatch(getListStationAction());
			}
		} catch (error) {
			message.error("delete station thất bại");
			console.log(error);
		}
	};
};
