import {baseService} from "./BaseService";

export class PayService extends baseService {
	constructor() {
		super();
	}
	pay = (ticketbooking) => {
		return this.post(`/payment`, ticketbooking);
	};
}
export const payService = new PayService();
