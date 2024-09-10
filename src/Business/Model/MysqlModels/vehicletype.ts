import { vehicleType } from "../Interfaces/vehicletype";

export class VehicleType implements vehicleType {
	vehicle: string;
	fuelType: string;
	gcorkm: number;

	constructor(vehicle: string, fuelType: string, gcorkm: number) {
		this.vehicle = vehicle;
		this.fuelType = fuelType;
		this.gcorkm = gcorkm;
	}
}
