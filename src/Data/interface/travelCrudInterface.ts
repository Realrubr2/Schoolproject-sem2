import { travel } from "../../Business/Model/Interfaces/travel";
import { Dashboard } from "../../Business/Model/MysqlModels/dashboard";

/**
 * @author Dannique Klaver
 * @interface travelCrudInterface
 * @description This interface provides the methods to interact with the travel data.
 *
 * @method getAllDashboardData() Fetches all travel data with optional filters.
 * @method getFilteredDashboardData() Fetches travel data based on the provided filters.
 */
export interface travelCrudInterface {
	getAllDashboardData(filters?: {
		department?: string;
		vehicleType?: string;
		fuelType?: string;
	}): Promise<Dashboard[]>;

	getFilteredDashboardData(
		dates: { start: Date; end: Date },
		filters?: {
			department?: string;
			vehicleType?: string;
			fuelType?: string;
		}
	): Promise<Dashboard[]>;

	getPastRides(email: string): Promise<travel[] | null>;
}
