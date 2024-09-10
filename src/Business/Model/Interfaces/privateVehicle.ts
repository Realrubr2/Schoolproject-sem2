export interface privateVehicle {
	getEmail(): string;
	getVehicleType(): string;
	getFuelType(): string;
	setEmail(email: string): void;
	setVehicleType(vehicleType: string): void;
	setFuelType(fuelType: string): void;
}
