import { stringify } from "querystring";
import { travelCrudInterface } from "../../../Data/interface/travelCrudInterface";
import { travel } from "../../Model/Interfaces/travel";
import { Dashboard } from "../../Model/MysqlModels/dashboard";
import { UserBySessionService } from "../UserBySessionService";
import { TravelDateValidationService } from "../travel/travelDateValidationService";
/**
 * @author Dannique Klaver
 *
 * @class TravelServiceHandler
 * @description This class provides methods to interact with the travel data.
 */
export class TravelServiceHandler {
	public constructor(
		private dateValidationService: TravelDateValidationService,
		private crudInterface: travelCrudInterface,
		private UserBySession: UserBySessionService
	) {}

	/**
	 * Fetches all travel data.
	 * @returns {Promise<Dashboard>} The travel data.
	 */
	async getAllDashboardData(filters?: {
		department?: string;
		vehicleType?: string;
		fuelType?: string;
	}): Promise<Dashboard[]> {
		try {
			return await this.crudInterface.getAllDashboardData(filters);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	/**
	 * @author Dannique Klaver
	 * @description Fetches travel data based on the provided filters.
	 *
	 * @param {Object} dates - The start and end dates for the travel data.
	 * @param {Object} filters - Filters for department, vehicleType, and fuelType.
	 * @returns {Promise<Dashboard[]>} The filtered travel data.
	 */
	async getFilteredDashboardData(
		dates: { start: Date; end: Date },
		filters?: {
			department?: string;
			vehicleType?: string;
			fuelType?: string;
		}
	): Promise<Dashboard[]> {
		try {
			// Validate the dates
			this.dateValidationService.validateDates(dates);

			return await this.crudInterface.getFilteredDashboardData(dates, filters);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
	/**
	 * @method getPastRides a nethod to get the rides
	 * @param email the email of the user you want to get ddata by!
	 * @returns a travel array or a null
	 */
	async getPastRides(session: string): Promise<travel[] | null> {
		let email = await this.UserBySession.getUserEmailBySession(session);
		if (email == null) {
			throw new Error("no session");
		}

		return await this.crudInterface.getPastRides(email);
	}
}
