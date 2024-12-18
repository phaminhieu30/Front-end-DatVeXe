import {baseService} from "./BaseService";

export class BookingService extends baseService {
	constructor() {
		super();
	}
	getProvince = () => {
		return this.get(`/stations/province`);
	};
	getTripByUser = (trip) => {
		return this.post(`/trips/tripUser`, trip);
	};
	getTripPassenger = (id) => {
		return this.get(`/tripPassenger?tripId=${id}`);
	};
	booking = (ticket) => {
		return this.post(`ticket/booking`, ticket);
	};
}
export const bookingService = new BookingService();
