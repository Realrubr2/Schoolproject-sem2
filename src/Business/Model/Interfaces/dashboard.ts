/**
 * @author Dannique Klaver
 * @interface Dashboard
 * @description This interface represents the data required for the dashboard page.
 */
export interface dashboard {
	dateTime: string;
	department: string;
	travelType: string;
	vehicleType: string;
	fuelType: string;
	gcorkm: number;
	km: number;
	euro: number;
	gco: number;
}
