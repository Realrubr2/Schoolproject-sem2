import { carLoan } from "../Interfaces/carLoan";

/**
 * @author Storm Verwer
 */
export class CarLoan implements carLoan {
	constructor(
		private email: string,
		private licensePlate: string,
		private startDate: Date,
		private endDate: Date
	) {
		this.email = email;
		this.licensePlate = licensePlate;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	get _email(): string {
		return this.email;
	}
	get _licensePlate(): string {
		return this.licensePlate;
	}
	get _startDate(): Date {
		return this.startDate;
	}
	get _endDate(): Date {
		return this.endDate;
	}
}
