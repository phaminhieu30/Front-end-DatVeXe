import {baseService} from "./BaseService";

export class TripService extends baseService {
	constructor() {
		super();
	}
	getTrip = () => {
		return this.get(`/trips`);
	};
	createTrip = (tripcreate) => {
		return this.post(`/trips`, tripcreate);
	};
	createTripPassenger = (tripcreate) => {
		return this.post(`/tripPassenger`, tripcreate);
	};

	getDetailTrip = (id) => {
		return this.get(`/trips/${id}`);
	};
	getDetailTripPassenger = (id) => {
		return this.get(`/tripPassenger/${id}`);
	};
	getTripPassenger = (tripId) => {
		return this.get(`/tripPassenger?tripId=${tripId}`);
	};
	getAllTripPassenger = () => {
		return this.get(`/tripPassenger`);
	};
	updateTripPassenger = (tripPassenger, id) => {
		return this.put(`/tripPassenger/${id}`, tripPassenger);
	};
	deleteTripPassenger = (id) => {
		return this.delete(`/tripPassenger/${id}`);
	};
	confirmTripPassenger = (id, status) => {
		return this.put(`/tripPassenger/confirm/${id}`, status);
	};
	//SORT PRICE
	sortPriceTripPassenger = (tripSort) => {
		return this.post(`/tripPassenger/sortprice`, tripSort);
	};
	//SORT time
	sortTimeTripPassenger = (tripSort) => {
		return this.post(`/tripPassenger/sorttime`, tripSort);
	};
	FilterTimeTripPassenger = (tripSort) => {
		return this.post(`/tripPassenger/filtertime`, tripSort);
	};
}
export const tripService = new TripService();
