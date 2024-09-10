import { privateVehicle } from "../Interfaces/privateVehicle";

export class PrivateVehicle implements privateVehicle {
	private email!: string;
	private vehicleType!: string;
	private fuelType!: string;

	constructor(email: string, vehicleType: string, fuelType: string) {
		this.setEmail(email);
		this.setVehicleType(vehicleType);
		this.setFuelType(fuelType);
	}

	public getEmail(): string {
		return this.email;
	}

	public getVehicleType(): string {
		return this.vehicleType;
	}

	public getFuelType(): string {
		return this.fuelType;
	}

	public setEmail(email: string): void {
		if (email === null || email === undefined || email === "") {
			throw new Error("email mag niet leeg zijn");
		}
		this.email = email;
	}

	public setVehicleType(vehicleType: string): void {
		if (
			vehicleType === null ||
			vehicleType === undefined ||
			vehicleType === ""
		) {
			throw new Error("vehicleType mag niet leeg zijn");
		}
		this.vehicleType = vehicleType;
	}

	public setFuelType(fuelType: string): void {
		if (fuelType === null || fuelType === undefined || fuelType === "") {
			throw new Error("fuelType mag niet leeg zijn");
		}
		this.fuelType = fuelType;
	}
}
