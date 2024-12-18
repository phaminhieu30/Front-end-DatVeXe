import {message} from "antd";
import {vehicleService} from "../services/VehicleService";
import {HIDE_LOADING_SPIN, SET_LOADING_SPIN} from "../types/LoadingTypes";
import {GET_IMAGE_VEHICLE, SET_FILELIST, SET_LIST_VEHICLE, SET_VEHICLE_DETAIL, GET_SEAT_VEHICLE, SET_VEHICLE_SELECT} from "../types/VehicleTypes";

export const getAllVehicleAction = () => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.getVehicle();
			if (result.status == 200) {
				dispatch({
					type: SET_LIST_VEHICLE,
					listVehicle: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getAllVehicleByPassengerAction = (passengerId) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.getPassengerVehicle(passengerId);
			if (result.status == 200) {
				dispatch({
					type: SET_VEHICLE_SELECT,
					listSelectVehicle: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getImageVehicleAction = (vehicleId) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.getImageVehicle(vehicleId);
			if (result.status == 200) {
				dispatch({type: SET_LOADING_SPIN});
				dispatch({
					type: GET_IMAGE_VEHICLE,
					listImageVehicle: result.data,
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

export const getDetailVehicleAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.getDetailVehicle(id);
			if (result.status == 200) {
				dispatch({
					type: SET_VEHICLE_DETAIL,
					vehicleDetail: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getDetailVehicleOfImageAction = (id) => {
	return async (dispatch, getState) => {
		try {
			const result = await vehicleService.getDetailVehicle(id);
			if (result.status == 200) {
				dispatch({
					type: SET_VEHICLE_DETAIL,
					vehicleDetail: result.data,
				});
				let vehicleDetail = getState().vehicleReducer.vehicleDetail;
				let fileListNew = vehicleDetail.vehicleOfImage?.map((item) => {
					let itemnew = {
						id: item.id,
						name: item.id,
						status: "done",
						url: item.link,
						vehicleId: item.vehicleId,
					};
					return itemnew;
				});
				dispatch({
					type: SET_FILELIST,
					fileList: fileListNew,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const UpdateVehicleAction = (id, vehicle) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.UpdateVehicle(id, vehicle);
			if (result.status == 200) {
				message.success("update xe thành công");
				dispatch(getAllVehicleAction());
			}
		} catch (error) {
			message.error("update xe thất bại");
			console.log(error);
		}
	};
};

export const createVehicleAction = (vehicle) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.CreateVehicle(vehicle);
			console.log(result);
			if (result.status == 201) {
				message.success("Tạo Xe  thành công");
				dispatch(getAllVehicleAction());
			}
		} catch (error) {
			message.error("Tạo  xe thất bại");
			console.log(error);
		}
	};
};

export const DeleteVehicleAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.DeleteVehicle(id);
			if (result.status == 200) {
				message.success("Xóa xe thành công");
				dispatch(getAllVehicleAction());
			}
		} catch (error) {
			message.error("Xóa xe thất bại");
			console.log(error);
		}
	};
};

export const CreateImgVehicleAction = (id, file) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.createImgVehicle(id, file);
			console.log(result);
			if (result.status == 200) {
				message.success("thêm ảnh xe thành công");
				dispatch(getAllVehicleAction());
			}
		} catch (error) {
			message.error("thêm ảnh xe thất bại");
			console.log(error);
		}
	};
};

export const deleteImgVehicleAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.deleteImgVehicle(id);
			console.log(result);
			if (result.status == 200) {
				dispatch(getAllVehicleAction());
				message.success("Xóa ảnh xe thành công");
			}
		} catch (error) {
			message.error("Xóa ảnh xe thất bại");
			console.log(error);
		}
	};
};

export const getSeatVehicleAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await vehicleService.getSeatVehicle(id);
			console.log(result);
			if (result.status == 200) {
				dispatch({type: SET_LOADING_SPIN});
				dispatch({
					type: GET_SEAT_VEHICLE,
					listSeatVehicle: result.data,
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
