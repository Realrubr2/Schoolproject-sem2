import UserSequelize from "../../../Business/Model/SequelizeModels/user";
import TravelSequelize from "../../../Business/Model/SequelizeModels/travel";
import VehicleTypeSequelize from "../../../Business/Model/SequelizeModels/vehicletype";
import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";
import { Op } from "sequelize";
import { travelCrudInterface } from "../../interface/travelCrudInterface";
import { Dashboard } from "../../../Business/Model/MysqlModels/dashboard";
import { travel } from "../../../Business/Model/Interfaces/travel";
import { ModelFactory } from "../../../Util/Factory/modelFactory";

/**
 * @author Dannique Klaver
 * @description This class is responsible for getting the travel data from the database.
 *
 * @returns {Promise<Dashboard[]>} Returns a promise that resolves to an array of Dashboard objects.
 *
 */
export class TravelSequelizeMysql implements travelCrudInterface {
	/**
	 * @author Dannique Klaver
	 * @description Retrieves all the data for the Dashboard page with optional filters.
	 *
	 * @param {Object} filters - Optional filters for department, vehicleType, and fuelType.
	 * @returns {Promise<Dashboard[]>} The travel data.
	 */
	async getAllDashboardData(filters?: {
		department?: string;
		vehicleType?: string;
		fuelType?: string;
	}): Promise<Dashboard[]> {
		/**
		 * Query explanation:
		 * - Select the dateTime attribute from the travel table.
		 * - Include the user table and select the department attribute.
		 * - Include the travel table and select the travelType, vehicleType, gcorkm, km, and euro attributes.
		 * - Include the vehicle table and select the fuelType and gcorkm attributes.
		 * - Apply the filters if they are provided.
		 * - Execute the query.
		 */
		let queryOptions = {
			attributes: ["dateTime"],
			include: [
				{
					model: UserSequelize,
					attributes: ["department"],
					where: filters?.department
						? { department: filters.department }
						: undefined,
				},
				{
					model: TravelSequelize,
					attributes: ["travelType", "vehicleType", "gcorkm", "km", "euro"],
					where: filters?.vehicleType
						? { vehicleType: filters.vehicleType }
						: undefined,
					include: [
						{
							model: VehicleTypeSequelize,
							attributes: ["fuelType", "gcorkm"],
							where: filters?.fuelType
								? { fuelType: filters.fuelType }
								: undefined,
						},
					],
				},
			],
		};

		// Execute the query
		const dashboardData = await TravelSequelize.findAll(queryOptions);

		// Converts the data to the Dashboard model.
		if (dashboardData && dashboardData.length > 0) {
			return convertRowDataToModels<Dashboard>(
				dashboardData,
				[
					"dateTime",
					"department",
					"travelType",
					"vehicleType",
					"fuelType",
					"gcorkm",
					"km",
					"euro",
					"gco",
				],
				Dashboard
			);
		} else {
			return [];
		}
	}

	/**
	 * @author Dannique Klaver
	 * @description Retrieves the filtered data for the Dashboard page.
	 *
	 * @param dates - The start and end dates for the data.
	 * @param filters - Filters for department, vehicleType, and fuelType.
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
		/**
		 * Query explanation:
		 * - Select the dateTime attribute from the travel table.
		 * - Include the user table and select the department attribute.
		 * - Include the travel table and select the travelType, vehicleType, gcorkm, km, and euro attributes.
		 * - Include the vehicle table and select the fuelType and gcorkm attributes.
		 * - Check if the department filter is provided and apply it if it is.
		 * - Check if the vehicleType filter is provided and apply it if it is.
		 * - Check if the fuelType filter is provided and apply it if it is.
		 * - Apply the date filter.
		 * - Execute the query.
		 */
		let queryOptions = {
			attributes: ["dateTime"],
			include: [
				{
					model: UserSequelize,
					attributes: ["department"],
					where: filters?.department
						? { department: filters.department }
						: undefined,
				},
				{
					model: TravelSequelize,
					attributes: ["travelType", "vehicleType", "gcorkm", "km", "euro"],
					where: filters?.vehicleType
						? { vehicleType: filters.vehicleType }
						: undefined,
					include: [
						{
							model: VehicleTypeSequelize,
							attributes: ["fuelType", "gcorkm"],
							where: filters?.fuelType
								? { fuelType: filters.fuelType }
								: undefined,
						},
					],
				},
			],
			where: {
				dateTime: {
					[Op.between]: [dates.start, dates.end],
				},
			},
		};

		// Execute the query
		const dashboardData = await TravelSequelize.findAll(queryOptions);

		// Converts the data to the Dashboard model.
		if (dashboardData && dashboardData.length > 0) {
			return convertRowDataToModels<Dashboard>(
				dashboardData,
				[
					"dateTime",
					"department",
					"travelType",
					"vehicleType",
					"fuelType",
					"gcorkm",
					"km",
					"euro",
					"gco",
				],
				Dashboard
			);
		} else {
			return [];
		}
	}
	/**
	 * @author Ramon iro-omo
	 * Gets the past rides of the user by the email also checks if the past rides are not more than a week old
	 * @param email THe email of the user
	 * @returns
	 */
	async getPastRides(email: string): Promise<travel[] | null> {
		let oneWeekFromToday = new Date();
		oneWeekFromToday.setDate(oneWeekFromToday.getDate() - 7);
		const pastRides: TravelSequelize[] | null = await TravelSequelize.findAll({
			where: {
				email: email,
				travelDate: {
					[Op.ne]: oneWeekFromToday,
				},
			},
		});
		if (pastRides != null) {
			return pastRides.map((ride: TravelSequelize) => {
				return ModelFactory.getInstance().createTravel(
					ride.dateTime,
					ride.locationFrom,
					ride.locationTo,
					ride.email,
					ride.travelDate,
					ride.gco,
					ride.travelType
				);
			});
		}
		return null;
	}
}
