import {baseService} from "./BaseService";

export class VehicleService extends baseService {
	constructor() {
		super();
	}
	getVehicle = () => {
		return this.get(`/vehicles`);
	};
	getPassengerVehicle = (id) => {
		return this.get(`/vehicles/passenger?passengerCarId=${id}`);
	};
	getImageVehicle = (vehicleId) => {
		return this.get(`/image?vehicleId=${vehicleId}`);
	};
	getDetailVehicle = (id) => {
		return this.get(`/vehicles/${id}`);
	};
	UpdateVehicle = (id, vehicle) => {
		return this.put(`/vehicles/${id}`, vehicle);
	};
	CreateVehicle = (vehicle) => {
		return this.post(`/vehicles`, vehicle);
	};
	DeleteVehicle = (id) => {
		return this.delete(`/vehicles/${id}`);
	};
	createImgVehicle = (id, file) => {
		return this.postImage(`/image?vehicleId=${id}`, file);
	};
	deleteImgVehicle = (id) => {
		return this.delete(`/image/${id}`);
	};
	getSeatVehicle = (id) => {
		return this.get(`/seats?vehicleId=${id}`);
	};
}
export const vehicleService = new VehicleService();
