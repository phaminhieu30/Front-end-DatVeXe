import {baseService} from "./BaseService";

export class SeatService extends baseService {
	constructor() {
		super();
	}
	createSeat = (id, listSeat) => {
		return this.post(`/seats?vehicleId=${id}`, listSeat);
	};

	getDetailSeat = (id) => {
		return this.get(`/seats/${id}`);
	};
	updateSeat = (id, seat) => {
		return this.put(`/seats/${id}`, seat);
	};
	deleteSeat = (id) => {
		return this.delete(`/seats/${id}`);
	};
}
export const seatService = new SeatService();
