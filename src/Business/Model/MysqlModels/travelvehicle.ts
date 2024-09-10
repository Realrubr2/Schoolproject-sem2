import { travelVehicle } from "../Interfaces/travelvehicle";

export class TravelVehicle implements travelVehicle {
	dateTime: string;
	vehicleType: string;
	fuelType: string;
	km: number;
	euro: number;
	constructor(
		dateTime: string,
		vehicleType: string,
		fuelType: string,
		km: number,
		euro: number
	) {
		this.dateTime = dateTime;
		this.vehicleType = vehicleType;
		this.fuelType = fuelType;
		this.km = km;
		this.euro = euro;
	}
}
