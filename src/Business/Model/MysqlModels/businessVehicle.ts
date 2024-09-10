/**
 * @author Storm Verwer
 */
import { businessVehicle } from "../Interfaces/businessVehicle";

export class BusinessVehicle implements businessVehicle {
	private licensePlate: string;
	private vehicleType: string;
	private fuelType: string;

	constructor(licensePlate: string, vehicleType: string, fuelType: string) {
		this.licensePlate = licensePlate;
		this.vehicleType = vehicleType;
		this.fuelType = fuelType;
	}

	get _licensePlate(): string {
		return this.licensePlate;
	}

	get _vehicleType(): string {
		return this.vehicleType;
	}

	get _fuelType(): string {
		return this.fuelType;
	}
}
