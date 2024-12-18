import {baseService} from "./BaseService";

export class TimePointService extends baseService {
	constructor() {
		super();
	}
	getTimePointTrip = (tripPassengerId) => {
		return this.get(`/timepoint?tripPassengerId=${tripPassengerId}`);
	};
	createTimePointTrip = (timePoint) => {
		return this.post(`/timepoint`, timePoint);
	};
	getDetailTimePointTrip = (id) => {
		return this.get(`/timepoint/${id}`);
	};
}
export const timePointService = new TimePointService();
