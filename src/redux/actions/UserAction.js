import {message} from "antd";
import {USER_LOGIN} from "../../util/settings/config";
import {userService} from "../services/UserService";
import {HIDE_MODAL} from "../types/ModalTypes";
import {GET_DETAIL_USER, GET_LIST_USER, LOGIN, NOFICATION, SET_USER} from "../types/userTypes";

export const LoginAction = (user) => {
	return async (dispatch) => {
		try {
			const result = await userService.loginService(user);
			console.log(result);
			if (result.status == 200) {
				dispatch({
					type: LOGIN,
					token: result.data.token,
					user: result.data.user,
				});
				dispatch({
					type: NOFICATION,
					title: "success",
					text: "Đăng nhập thành công!",
				});
			}
		} catch (error) {
			dispatch({
				type: NOFICATION,
				title: "error",
				text: "Lỗi Đăng Nhập, Vui lòng thử lại!",
			});
		}
	};
};

export const registerAction = (user) => {
	return async (dispatch) => {
		try {
			const result = await userService.registerService(user);
			console.log(result);
			if (result.status == 201) {
				dispatch({
					type: NOFICATION,
					title: "success",
					text: "Đăng ký thành công!",
				});
				dispatch(getUserAction());
			}
		} catch (error) {
			dispatch({
				type: NOFICATION,
				title: "error",
				text: "Lỗi Đăng ký, Vui lòng thử lại!",
			});
		}
	};
};

export const getUserAction = (name = "") => {
	return async (dispatch) => {
		try {
			const result = await userService.getAllUser(name);
			if (result.status == 200) {
				dispatch({
					type: GET_LIST_USER,
					listUser: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getDetailUserAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await userService.getDetails(id);
			if (result.status == 200) {
				dispatch({
					type: GET_DETAIL_USER,
					detailUser: result.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const UpdatelUserAction = (userUpdate, id) => {
	return async (dispatch, getState) => {
		try {
			const result = await userService.updateUser(userUpdate, id);
			console.log(result);
			if (result.status == 200) {
				message.success("Cập nhật thành công");
				let userLogin = getState().userReducer.userLogin;
				if (userLogin.id == result.data.id) {
					localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
					dispatch({
						type: SET_USER,
						userLogin: result.data,
					});
				}

				dispatch(getUserAction());
				dispatch({
					type: HIDE_MODAL,
				});
			}
		} catch (error) {
			message.error("Cập nhật thất bại");
			console.log(error);
		}
	};
};

export const UpdatelBookingUserAction = (userUpdate, id) => {
	return async (dispatch) => {
		try {
			const result = await userService.updateUserBooking(userUpdate, id);
			console.log(result);
			if (result.status == 200) {
				message.success("Cập nhật thành công");
				localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
				dispatch({
					type: SET_USER,
					userLogin: result.data,
				});
				dispatch({
					type: HIDE_MODAL,
				});
			}
		} catch (error) {
			message.error("Cập nhật thất bại");
			console.log(error);
		}
	};
};
export const deleteUserAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await userService.deleteUser(id);
			console.log(result);
			if (result.status == 200) {
				message.success("xóa user thành công");
				dispatch(getUserAction());
			}
		} catch (error) {
			message.error("Xóa user thất bại");
			console.log(error);
		}
	};
};
