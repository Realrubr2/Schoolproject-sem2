import { carLoanCrudInterface } from "../../../Data/interface/carLoanInterface";
import { BusinessVehicle } from "../../Model/MysqlModels/businessVehicle";
import { CarLoan } from "../../Model/MysqlModels/carLoan";
import { CarLoanSearch } from "../../Model/MysqlModels/carLoanSearch";
import { DateService } from "./validateCarloanDate";

/**
 * @fileoverview This class provides the service layer for car loans.
 * @author Storm Verwer
 */
export class CarLoanService {
	public constructor(
		private crudinterface: carLoanCrudInterface,
		private dateService: DateService = new DateService()
	) {}

	/**
	 * @description Retrieves the cars available between the specified dates.
	 * This method validates the start and end dates, then calls the getCarsAvailableBetweenDates method of the crudinterface
	 * to retrieve an array of BusinessVehicle objects. If the array is not empty, it returns the array.
	 * If the array is empty, it throws an error.
	 *
	 * @param {CarLoanSearch} searchData - The searchData should contain the start and end dates and an optional fuelType.
	 * @returns {Promise<BusinessVehicle[]>} An array of `BusinessVehicle` objects that macth the search criteria.
	 */
	public async getCarsAvailableBetweenDates(
		searchData: CarLoanSearch
	): Promise<BusinessVehicle[]> {
		this.dateService.validateDateOrderAndFuture(
			searchData._startDate,
			searchData._endDate
		);
		const businessVehicle =
			await this.crudinterface.getCarsAvailableBetweenDates(searchData);
		if (businessVehicle && businessVehicle.length > 0) {
			return businessVehicle;
		} else {
			throw new Error(
				`Er zijn geen auto's beschikbaar die voldoen aan de zoekcriteria`
			);
		}
	}
	/**
	 * @description Creates a new car loan.
	 * This method validates the start and end dates of the car loan, then calls the createCarloan method of the crudinterface`
	 * to create a new car loan. If the car loan is successfully created, it returns the car loan.
	 * If there is an error, it logs the error and rethrows it.
	 *
	 * @param {CarLoan} carLoan - The car loan to create.
	 * @returns {Promise<CarLoan>} The created car loan.
	 */
	public async createCarloan(carLoan: CarLoan): Promise<CarLoan> {
		this.dateService.validateDateOrderAndFuture(
			carLoan._startDate,
			carLoan._endDate
		);
		return await this.crudinterface.createCarloan(carLoan);
	}
}
