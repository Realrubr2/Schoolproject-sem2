import { dashboard } from "../Interfaces/dashboard";

export class Dashboard implements dashboard {
	dateTime: string;
	department: string;
	travelType: string;
	vehicleType: string;
	fuelType: string;
	gcorkm: number;
	km: number;
	euro: number;
	gco: number;

	constructor(
		dateTime: string,
		department: string,
		travelType: string,
		vehicleType: string,
		fuelType: string,
		gcorkm: number,
		km: number,
		euro: number,
		gco: number
	) {
		this.dateTime = dateTime;
		this.department = department;
		this.travelType = travelType;
		this.vehicleType = vehicleType;
		this.fuelType = fuelType;
		this.gcorkm = gcorkm;
		this.km = km;
		this.euro = euro;
		this.gco = gco;
	}
}
