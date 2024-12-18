import {baseService} from "./BaseService";

export class PassengerService extends baseService {
	constructor() {
		super();
	}
	getAllPassenger = () => {
		return this.get(`/passenger`);
	};
	getDetailPassenger = (id) => {
		return this.get(`/passenger/${id}`);
	};

	updatePassenger = (passenger, id) => {
		return this.put(`/passenger/${id}`, passenger);
	};

	updateImagePassenger = (id, file) => {
		return this.putUpdateImage(`/passenger/upload/${id}`, file);
	};

	deletePassenger = (id) => {
		return this.delete(`/passenger/${id}`);
	};
	createPassenger = (passenger) => {
		return this.post(`/passenger`, passenger);
	};
}
export const passengerService = new PassengerService();
