/**
 * @author Storm Verwer
 */
import { iCarLoanSearch } from "../Interfaces/carLoanSearch";
import { DateSearch } from "./dateSearch";

export class CarLoanSearch extends DateSearch implements iCarLoanSearch {
	private fuelType?: string;

	constructor(startDate: Date, endDate: Date, fuelType?: string) {
		super(startDate, endDate);
		this.fuelType = fuelType;
	}

	public get _fuelType(): string | undefined {
		return this.fuelType;
	}
}
