/**
 * @fileoverview This class provides services for date validation.
 * @author Storm Verwer
 */

export class DateService {
	/**
	 * @description Validates the order of the start and end dates and checks if they are in the future.
	 * @param {Date} startDate - The start date to validate.
	 * @param {Date} endDate - The end date to validate.
	 * @throws Will throw an error with a message that fits the situation.
	 */
	public validateDateOrderAndFuture(startDate: Date, endDate: Date): void {
		if (startDate > endDate) {
			throw new Error("De van datum kan niet voor de tot datum zijn.");
		}
		const now = new Date();
		if (startDate < now) {
			throw new Error("De ingevoerde van datum is al verstreken.");
		}
		if (endDate < now) {
			throw new Error("De ingevoerde tot datum is al verstreken.");
		}
	}

	/**
	 * @description Validates if the provided values are valid dates.
	 * @param {Date} startDate - The start date to validate.
	 * @param {Date} endDate - The end date to validate.
	 * @throws Will throw an error if either the start date or the end date is not a valid date.
	 */
	public validateDates(startDate: Date, endDate: Date): void {
		if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
			throw new Error("Invalide van datum");
		}
		if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
			throw new Error("Invalide tot datum");
		}
	}

	/**
	 * @description Parses the provided values into dates and validates them
	 * @param {string | Date} startDate - The start date to parse and validate.
	 * @param {string | Date} endDate - The end date to parse and validate.
	 * @returns {[Date, Date]} The parsed and validated start and end dates.
	 */
	public parseDates(
		startDate: string | Date,
		endDate: string | Date
	): [Date, Date] {
		const parsedStartDate = new Date(startDate);
		const parsedEndDate = new Date(endDate);
		return [parsedStartDate, parsedEndDate];
	}
}
