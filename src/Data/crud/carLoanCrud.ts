import { CarLoanMysql } from "../models/carLoan/carLoanMysql";
import { CarLoanSequelizeMysql } from "../models/carLoan/carLoanSequelize";
import { carLoanCrudInterface } from "../interface/carLoanInterface";
import { BusinessVehicle } from "../../Business/Model/MysqlModels/businessVehicle";
import { CarLoanSearch } from "../../Business/Model/MysqlModels/carLoanSearch";
import { CarLoan } from "../../Business/Model/MysqlModels/carLoan";

/**
 * @fileoverview This class provides CRUD operations for car loans.
 * @author Storm Verwer
 */

export class CarLoanCrud implements carLoanCrudInterface {
	public constructor(private carLoan: CarLoanMysql | CarLoanSequelizeMysql) {}

	/**
	 * @description Retrieves the cars available between the specified dates.
	 * @param {CarLoanSearch} searchData - The search data, should contain the start and end dates and an optional fuelType.
	 * @returns {Promise<BusinessVehicle[]>} An array of `BusinessVehicle` objects that are available between the specified dates.
	 */
	public async getCarsAvailableBetweenDates(
		searchData: CarLoanSearch
	): Promise<BusinessVehicle[]> {
		return (await this.carLoan.getCarsAvailableBetweenDates(
			searchData
		)) as BusinessVehicle[];
	}
	/**
	 * @description: Creates a new car loan.
	 * @param {CarLoan} carLoan - The car loan to create.
	 * @returns {Promise<CarLoan>} The created car loan.
	 */
	public async createCarloan(carLoan: CarLoan): Promise<CarLoan> {
		return await this.carLoan.createCarloan(carLoan);
	}
}
