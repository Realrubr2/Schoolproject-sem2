/**
 * @author Storm Verwer
 *
 */
import { DateService } from "../../Service/carLoan/validateCarloanDate";
import { iDateSearch } from "../Interfaces/dateSearch";

export class DateSearch implements iDateSearch {
	private startDate: Date;
	private endDate: Date;

	constructor(startDate: Date, endDate: Date) {
		const dateService = new DateService();
		dateService.validateDates(startDate, endDate);
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public get _startDate(): Date {
		return this.startDate;
	}

	public get _endDate(): Date {
		return this.endDate;
	}
}
