import {baseService} from "./BaseService";

export class StationService extends baseService {
	constructor() {
		super();
	}
	getListStation = () => {
		return this.get(`/stations`);
	};
	getDetailStation = (id) => {
		return this.get(`/stations/${id}`);
	};
	updateStation = (id, stationupdate) => {
		return this.put(`/stations/${id}`, stationupdate);
	};
	createStation = (station) => {
		return this.post(`/stations`, station);
	};
	deleteStation = (id) => {
		return this.delete(`/stations/${id}`);
	};
}
export const stationService = new StationService();
