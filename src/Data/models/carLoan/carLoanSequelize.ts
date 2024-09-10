import { carLoanCrudInterface } from "../../interface/carLoanInterface";
import { Op } from "sequelize";
import CarLoanSequelize from "../../../Business/Model/SequelizeModels/carLoan";
import BusinessVehicleSequelize from "../../../Business/Model/SequelizeModels/businessVehicle";
import { CarLoanSearch } from "../../../Business/Model/MysqlModels/carLoanSearch";
import { BusinessVehicle } from "../../../Business/Model/MysqlModels/businessVehicle";
import { CarLoan } from "../../../Business/Model/MysqlModels/carLoan";
import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";
import { CarLoanFactory } from "../../../Util/Factory/modelFactoryCarloan";

/**
 * @fileoverview
 * @author Storm Verwer
 */
export class CarLoanSequelizeMysql implements carLoanCrudInterface {
	/**
	 * @description Builds the search criteria for getting cars available between dates.
	 * @param {CarLoanSearch} searchData - The search data.
	 * @returns The search criteria.
	 */
	private getCarsAvailableBetweenDatesSearchCriteria(
		searchData: CarLoanSearch
	) {
		return {
			attributes: ["licensePlate", "fuelType", "vehicleType"],
			where: {
				licensePlate: { [Op.ne]: "" },
				fuelType: searchData._fuelType || { [Op.ne]: null },
				[Op.or]: [
					{ "$carLoan.startDate$": { [Op.gt]: searchData._endDate } }, // Include cars with start date later than search end date
					{ "$carLoan.endDate$": { [Op.lt]: searchData._startDate } }, // Include cars with end date earlier than search start date
					{ "$carLoan.licensePlate$": { [Op.is]: null } }, // Include cars with no associated CarLoanSequelize
				],
			},
			include: [
				{
					model: CarLoanSequelize,
					required: false,
					attributes: ["licensePlate", "startDate", "endDate"],
				},
			],
		};
	}

	/**
	 * @description Retrieves the cars available between the specified dates.
	 * This method uses the getCarsAvailableBetweenDatesSearchCriteria to setup the sequelize query to find all
	 * BusinessVehicle objects that are not currently booked between the specified dates.
	 * If a fuel type is specified in the search data, the criteria will only return vehicles of that fuel type.
	 * The method then converts the results to BusinessVehicle objects.
	 *
	 * @param {CarLoanSearch} searchData - The search data, should contain the start and end dates and optionally a fuel type.
	 * @returns {Promise<BusinessVehicle[]>} An array of BusinessVehicle objects that match the searchData.
	 */
	public async getCarsAvailableBetweenDates(
		searchData: CarLoanSearch
	): Promise<BusinessVehicle[]> {
		let result: BusinessVehicle[] = [];
		try {
			// Get the search criteria
			const searchCriteria =
				this.getCarsAvailableBetweenDatesSearchCriteria(searchData);
			// Find all cars that match the search criteria
			const availableCars = await BusinessVehicleSequelize.findAll(
				searchCriteria
			);
			// If there are available cars, convert the raw data to car objects
			if (availableCars && availableCars.length > 0) {
				result = convertRowDataToModels<BusinessVehicle>(
					availableCars,
					["licensePlate", "vehicleType", "fuelType"],
					BusinessVehicle
				);
			}
		} catch (error) {
			console.error("Error retrieving available cars:", error);
		}
		return result;
	}

	/**
	 * @description Creates a new car loan.
	 * This method creates a new car loan in the database using the sequelize model.
	 *
	 * @param {CarLoan} carLoan - The car loan to create.
	 * @returns {Promise<CarLoan>} The created car loan.
	 */
	public async createCarloan(carLoan: CarLoan): Promise<CarLoan> {
		try {
			const createdCarLoanSequelize = await CarLoanSequelize.create({
				email: carLoan._email,
				licensePlate: carLoan._licensePlate,
				startDate: carLoan._startDate,
				endDate: carLoan._endDate,
			});

			const createdCarLoan = CarLoanFactory.getInstance().createLoan(
				createdCarLoanSequelize.email,
				createdCarLoanSequelize.licensePlate,
				createdCarLoanSequelize.startDate,
				createdCarLoanSequelize.endDate
			);
			return createdCarLoan;
		} catch (error) {
			console.error("Error creating car loan:", error);
			throw error;
		}
	}
}
