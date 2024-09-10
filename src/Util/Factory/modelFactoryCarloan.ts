import { CarLoan } from "../../Business/Model/MysqlModels/carLoan";
import { CarLoanSearch } from "../../Business/Model/MysqlModels/carLoanSearch";

/**
 * @author Storm Verwer
 * @description This class is a factory for creating CarLoan and CarLoanSearch objects.
 */
export class CarLoanFactory {
	private static instance: CarLoanFactory;

	private constructor() {}

	static getInstance(): CarLoanFactory {
		if (!CarLoanFactory.instance) {
			CarLoanFactory.instance = new CarLoanFactory();
		}
		return CarLoanFactory.instance;
	}

	public createSearch(
		startDate: Date,
		endDate: Date,
		fuelType: string
	): CarLoanSearch {
		return new CarLoanSearch(
			startDate,
			endDate,
			fuelType !== "noFuelType" ? fuelType : undefined
		);
	}

	public createLoan(
		email: string,
		licensePlate: string,
		startDate: Date,
		endDate: Date
	): CarLoan {
		return new CarLoan(email, licensePlate, startDate, endDate);
	}
}
