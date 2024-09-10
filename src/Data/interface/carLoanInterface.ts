import { BusinessVehicle } from "../../Business/Model/MysqlModels/businessVehicle";
import { CarLoan } from "../../Business/Model/MysqlModels/carLoan";
import { CarLoanSearch } from "../../Business/Model/MysqlModels/carLoanSearch";

export interface carLoanCrudInterface {
	getCarsAvailableBetweenDates(
		searchData: CarLoanSearch
	): Promise<BusinessVehicle[]>;

	createCarloan(carLoan: CarLoan): Promise<CarLoan>;
}
