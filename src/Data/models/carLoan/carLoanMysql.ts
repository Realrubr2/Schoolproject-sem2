import { carLoanCrudInterface } from "../../interface/carLoanInterface";
import { OkPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2";
import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { BusinessVehicle } from "../../../Business/Model/MysqlModels/businessVehicle";
import { CarLoanSearch } from "../../../Business/Model/MysqlModels/carLoanSearch";
import { CarLoan } from "../../../Business/Model/MysqlModels/carLoan";

/**
 * @fileoverview
 * @author Storm Verwer
 */
export class CarLoanMysql implements carLoanCrudInterface {
	private pool = RelationalDatabase.getPool();

	/**
	 * @description Converts an array of RowDataPacket objects to an array of businessVehicle objects.
	 * @param {RowDataPacket[]} rowDataPackets - The array of RowDataPacket objects to convert.
	 * @returns {BusinessVehicle[]} An array of businessVehicle objects or an empty array if no vehicles were found.
	 */
	private convertRowDataPacketsToBusinessVehicles(
		rowDataPackets: RowDataPacket[]
	): BusinessVehicle[] {
		// If the input array is undefined, throw an error
		if (rowDataPackets == null) {
			throw new Error("No vehicles found");
		}
		// Initialize an empty array to hold the businessVehicle objects
		const businessVehicleArray: BusinessVehicle[] = [];
		// For each element in the input array, create a new businessVehicle object and add it to the array
		rowDataPackets.forEach((element: any) => {
			let vehicle: BusinessVehicle = new BusinessVehicle(
				element.licensePlate,
				element.vehicleType,
				element.fuelType
			);
			businessVehicleArray.push(vehicle);
		});
		return businessVehicleArray;
	}

	/**
	 *@author Storm Verwer
	 * @description Retrieves the cars available between the specified dates.
	 * This method constructs a SQL query to find all BusinessVehicle objects that are not currently booked between the specified dates.
	 * If a fuel type is specified in the search data, the query will only return vehicles of that fuel type.
	 * The method then executes the query and converts the results to `BusinessVehicle` objects.
	 *
	 * @param {CarLoanSearch} searchData - The search data, should contain the start and end dates and optionally a fuel type.
	 * @returns {Promise<BusinessVehicle[]>} An array of `BusinessVehicle` objects that are available between the specified dates.
	 */
	public async getCarsAvailableBetweenDates(
		searchData: CarLoanSearch
	): Promise<BusinessVehicle[]> {
		let results: BusinessVehicle[] = [];
		let queryParams = [
			searchData._startDate,
			searchData._endDate,
			searchData._fuelType !== undefined ? searchData._fuelType : null,
		];

		if (this.pool) {
			try {
				let query = `
                SELECT BusinessVehicle.licensePlate, BusinessVehicle.fuelType, BusinessVehicle.vehicleType 
                FROM BusinessVehicle
                WHERE BusinessVehicle.licensePlate != '' AND 
                NOT EXISTS (
                SELECT * FROM CarLoan 
                WHERE BusinessVehicle.licensePlate = CarLoan.licensePlate
                AND (CarLoan.startDate < ? AND CarLoan.endDate > ?)
                )
                AND BusinessVehicle.fuelType = IFNULL(?, BusinessVehicle.fuelType)
                    `;

				// Execute the SQL query
				const [availableCars, _fields] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(query, queryParams);
				// If results are found, convert them to business vehicles
				if (availableCars.length > 0) {
					results = this.convertRowDataPacketsToBusinessVehicles(availableCars);
				}
			} catch (error) {
				console.error(error);
			}
		}
		return results;
	}

	/**
	 * @author Storm Verwer
	 * @description Creates a new car loan.
	 * This method constructs a SQL query to insert a new car loan into the database.
	 * It then executes the query and returns the car loan object if the operation was successful.
	 *
	 * @param {CarLoan} carLoan - The car loan to create.
	 * @returns {Promise<CarLoan>} The created car loan.
	 */
	public async createCarloan(carLoan: CarLoan): Promise<CarLoan> {
		if (!this.pool) {
			throw new Error("Database connection pool is not available");
		}
		const query = `
            INSERT INTO CarLoan (email, licensePlate, startDate, endDate)
            VALUES (?, ?, ?, ?)
        `;
		const queryParams = [
			carLoan._email,
			carLoan._licensePlate,
			carLoan._startDate,
			carLoan._endDate,
		];
		try {
			// Execute the SQL query
			const [carLoanInsert] = await this.pool
				.promise()
				.execute<ResultSetHeader>(query, queryParams);

			// If the insert operation was successful, return the carLoan object
			if (carLoanInsert.affectedRows > 0) {
				return carLoan;
			}
			throw new Error("Car loan creation failed");
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
