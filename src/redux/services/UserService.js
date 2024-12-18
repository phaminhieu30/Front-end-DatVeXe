import {baseService} from "./BaseService";

export class UserService extends baseService {
	constructor() {
		super();
	}
	registerService = (user) => {
		return this.post(`users/register`, user);
	};
	loginService = (user) => {
		return this.post(`/users/login`, user);
	};
	getAllUser = (name = "") => {
		if (name.trim() !== "") {
			return this.get(`/users/get?name=${name}`);
		}
		return this.get(`/users/get`);
	};
	getDetails = (id) => {
		return this.get(`/users/getdetail/${id}`);
	};
	updateUser = (userUpdate, id) => {
		return this.put(`/users/update/${id}`, userUpdate);
	};
	updateUserBooking = (userUpdate, id) => {
		return this.put(`/users/updatebooking/${id}`, userUpdate);
	};
	deleteUser = (id) => {
		return this.delete(`/users/delete/${id}`);
	};
}
export const userService = new UserService();
