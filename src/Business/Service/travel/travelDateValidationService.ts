// TravelDateValidationService.ts
export class TravelDateValidationService {
	validateDates(dates: { start: Date; end: Date }) {
		const now = new Date();

		if (dates.start > now || dates.end > now) {
			throw new Error("Dates cannot be in the future");
		}

		if (dates.start > dates.end) {
			throw new Error("Start date cannot be after end date");
		}

		if (!dates.start || !dates.end) {
			throw new Error("Both dates must be selected");
		}
	}
}
