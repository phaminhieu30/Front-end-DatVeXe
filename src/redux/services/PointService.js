import {baseService} from "./BaseService";

export class PointService extends baseService {
	constructor() {
		super();
	}
	getAllPoint = (id) => {
		return this.get(`/point?stationId=${id}`);
	};
	getDetailPoint = (id) => {
		return this.get(`/point/${id}`);
	};
	updatePoint = (id, pointUpdate) => {
		return this.put(`/point/${id}`, pointUpdate);
	};
	createPoint = (point) => {
		return this.post(`/point`, point);
	};
	deletePoint = (id) => {
		return this.delete(`/point/${id}`);
	};
}

export const pointService = new PointService();
