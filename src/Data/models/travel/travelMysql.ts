import { RowDataPacket } from "mysql2";
import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { travelCrudInterface } from "../../interface/travelCrudInterface";
import { Dashboard } from "../../../Business/Model/MysqlModels/dashboard";
import { travel } from "../../../Business/Model/Interfaces/travel";
import { ModelFactory } from "../../../Util/Factory/modelFactory";

/**
 * @author Dannique Klaver
 * @description This class is responsible for getting the travel data from the database.
 *
 * @methods getAllDashboardData - Retrieves all the data for the Dashboard page.
 * @methods getFilteredDashboardData - Retrieves the filtered data for the Dashboard page.
 */
export class TravelMysql implements travelCrudInterface {
	// Get the pool from the RelationalDatabase class.
	private pool = RelationalDatabase.getPool();

	/**
	 * @author Dannique Klaver
	 * @description Retrieves all the data for the Dashboard page, optionally filtered by department, vehicle type, and fuel type.
	 *
	 * @param {Object} filters - An object containing optional filters for the query.
	 * @param {string} filters.department - The department to filter by.
	 * @param {string} filters.vehicleType - The vehicle type to filter by.
	 * @param {string} filters.fuelType - The fuel type to filter by.
	 * @returns {Promise<Dashboard[]>} returns a promise that resolves to an array of Dashboard objects.
	 */
	public async getAllDashboardData(filters?: {
		department?: string;
		vehicleType?: string;
		fuelType?: string;
	}): Promise<Dashboard[]> {
		// Initialize the return value as an empty array
		let returnValue: Dashboard[] = [];

		// Check if the database connection pool is available
		if (this.pool) {
			try {
				// Define the base query string
				let query =
					"SELECT tra.dateTime, usr.department, tra.travelType, trave.vehicleType, vety.fuelType, vety.gcorkm, trave.km, trave.euro, tra.gco FROM jordit.travel tra JOIN jordit.user usr ON tra.email = usr.email JOIN jordit.travelvehicle trave ON tra.dateTime = trave.dateTime JOIN jordit.vehicletype vety ON trave.vehicleType = vety.vehicleType AND trave.fuelType = vety.fuelType";

				// Initialize an array to hold the query parameters
				let queryParams = [];

				// Check if any filters were provided
				if (filters) {
					// Initialize an array to hold the WHERE clause conditions
					let whereClauses = [];

					// If a department filter was provided, add a condition for it
					if (filters.department) {
						whereClauses.push("usr.department = ?");
						queryParams.push(filters.department);
					}

					// If a vehicleType filter was provided, add a condition for it
					if (filters.vehicleType) {
						whereClauses.push("trave.vehicleType = ?");
						queryParams.push(filters.vehicleType);
					}

					// If a fuelType filter was provided, add a condition for it
					if (filters.fuelType) {
						whereClauses.push("vety.fuelType = ?");
						queryParams.push(filters.fuelType);
					}

					// If any conditions were added, append them to the query string
					if (whereClauses.length > 0) {
						query += " WHERE " + whereClauses.join(" AND ");
					}
				}

				// Execute the query with the provided parameters
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(query, queryParams);

				// If any results were returned, cast them to the Dashboard type
				if (results[0]) {
					returnValue = results as Dashboard[];
				}
			} catch (error) {
				// Log any errors that occur
				console.log(error);
			}
		}

		// Return the results
		return returnValue;
	}

	/**
	 * @author Dannique Klaver
	 * @description Retrieves the filtered data for the Dashboard page.
	 *
	 * @param dates - The start and end dates for the data.
	 * @param filters - An object containing optional filters for the query.
	 * @param filters.department - The department to filter by.
	 * @param filters.vehicleType - The vehicle type to filter by.
	 * @param filters.fuelType - The fuel type to filter by.
	 * @returns {Promise<Dashboard[]>} Returns a promise that resolves to an array of Dashboard objects.
	 */
	async getFilteredDashboardData(
		dates: { start: Date; end: Date },
		filters?: {
			department?: string;
			vehicleType?: string;
			fuelType?: string;
		}
	): Promise<Dashboard[]> {
		// Initialize the return value as an empty array
		let returnValue: Dashboard[] = [];

		// Check if the database connection pool is available
		if (this.pool) {
			try {
				// Define the base query string
				let query =
					"SELECT tra.dateTime, usr.department, tra.travelType, trave.vehicleType, vety.fuelType, vety.gcorkm, trave.km, trave.euro, tra.gco FROM jordit.travel tra JOIN jordit.user usr ON tra.email = usr.email JOIN jordit.travelvehicle trave ON tra.dateTime = trave.dateTime JOIN jordit.vehicletype vety ON trave.vehicleType = vety.vehicleType AND trave.fuelType = vety.fuelType";

				// Initialize an array to hold the query parameters
				let queryParams = [];

				// Initialize an array to hold the WHERE clause conditions
				let whereClauses = [];

				// Add a condition for the date range
				whereClauses.push("tra.dateTime BETWEEN ? AND ?");
				queryParams.push(dates.start, dates.end);

				// Check if any filters were provided
				if (filters) {
					// If a department filter was provided, add a condition for it
					if (filters.department) {
						whereClauses.push("usr.department = ?");
						queryParams.push(filters.department);
					}

					// If a vehicleType filter was provided, add a condition for it
					if (filters.vehicleType) {
						whereClauses.push("trave.vehicleType = ?");
						queryParams.push(filters.vehicleType);
					}

					// If a fuelType filter was provided, add a condition for it
					if (filters.fuelType) {
						whereClauses.push("vety.fuelType = ?");
						queryParams.push(filters.fuelType);
					}
				}

				// If any conditions were added, append them to the query string
				if (whereClauses.length > 0) {
					query += " WHERE " + whereClauses.join(" AND ");
				}

				// Execute the query with the provided parameters
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(query, queryParams);

				// If any results were returned, cast them to the Dashboard type
				if (results[0]) {
					returnValue = results as Dashboard[];
				}
			} catch (error) {
				// Log any errors that occur
				console.log(error);
			}
		}

		// Return the results
		return returnValue;
	}

	/**
	 * @author Ramon Iro-omo
	 * @param email the email of the user
	 * @returns a travel arrray that is mapped using the facory create model instance
	 */
	async getPastRides(email: string): Promise<travel[] | null> {
		let results: RowDataPacket[] | null;
		if (this.pool) {
			[results] = await this.pool
				.promise()
				.execute<RowDataPacket[]>(
					"SELECT * FROM travel WHERE email = ? AND travelDate => CURDATE()",
					[email]
				);
			if (results != null && results.length > 0) {
				return results.map((result) =>
					ModelFactory.getInstance().createTravel(
						result.dateTime,
						result.from,
						result.to,
						result.email,
						result.travelDate,
						result.gco,
						result.travelType
					)
				);
			}
		}
		return null;
	}
}
