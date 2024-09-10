import { vehicleCrudInterface } from "../../Data/interface/vehicleCrudInterface";
import { VehicleType } from "../Model/MysqlModels/vehicletype";

/**
 * @author Dannique Klaver
 *
 * @class VehicleService
 * @description This class provides methods to interact with the vehicle data.
 */
export class VehicleService {
	public constructor(private crudInterface: vehicleCrudInterface) {}

	/**
	 * Fetches all vehicle data.
	 * @returns {Promise<Dashboard>} The vehicle data.
	 */
	async getVehicles(): Promise<VehicleType[]> {
		try {
			return await this.crudInterface.getVehicles();
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
