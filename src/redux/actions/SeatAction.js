import {message} from "antd";
import {seatService} from "../services/seatService";
import {GET_DETAIL_SEAT} from "../types/VehicleTypes";
import {getAllVehicleAction, getDetailVehicleAction} from "./vehicleAction";

export const CreateSeatVehicleAction = (id, listSeat) => {
	return async (dispatch) => {
		try {
			const result = await seatService.createSeat(id, listSeat);
			console.log(result);
			if (result.status == 200) {
				message.success("thêm ghế xe thành công");
				dispatch(getAllVehicleAction());
				dispatch(getDetailVehicleAction(id));
			}
		} catch (error) {
			message.error("thêm ghế xe thất bại");
			console.log(error);
		}
	};
};

export const getSeatDetailAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await seatService.getDetailSeat(id);
			console.log(result);
			if (result.status == 200) {
				dispatch({
					type: GET_DETAIL_SEAT,
					seatDetail: result.data,
				});
			}
		} catch (error) {
			message.error("thêm ghế xe thất bại");
			console.log(error);
		}
	};
};

export const UpdateSeatAction = (id, seat, vehicleId) => {
	return async (dispatch) => {
		try {
			const result = await seatService.updateSeat(id, seat);
			console.log(result);
			if (result.status == 200) {
				message.success("cập nhật ghế xe thành công");
				dispatch(getAllVehicleAction());
				dispatch(getDetailVehicleAction(vehicleId));
			}
		} catch (error) {
			message.error("cập nhật ghế xe thất bại");
			console.log(error);
		}
	};
};

export const DeleteSeatAction = (id, vehicleId) => {
	return async (dispatch) => {
		try {
			const result = await seatService.deleteSeat(id);
			console.log(result);
			if (result.status == 200) {
				message.success("Xóa ghế xe thành công");
				dispatch(getAllVehicleAction());
				dispatch(getDetailVehicleAction(vehicleId));
			}
		} catch (error) {
			message.error("Xóa ghế xe thất bại");
			console.log(error);
		}
	};
};
