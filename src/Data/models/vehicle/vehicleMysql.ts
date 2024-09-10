import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { RowDataPacket } from "mysql2";
import { vehicleCrudInterface } from "../../interface/vehicleCrudInterface";
import { VehicleType } from "../../../Business/Model/MysqlModels/vehicletype";

/**
 * @author Dannique Klaver
 * @description This class is responsible for getting the vehicle data from the database.
 *
 * @methods getVehicles() retrieves all vehicle types.
 */
export class VehicleMysql implements vehicleCrudInterface {
	private pool = RelationalDatabase.getPool();

	/**
	 * @author Dannique Klaver
	 * @description Retrieves all the vehicle types.
	 *
	 * @returns {Promise<VehicleType[]>} - A promise that resolves to an array of vehicle objects.
	 */
	public async getVehicles(): Promise<VehicleType[]> {
		let returnValue: VehicleType[] = [];
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>("SELECT * FROM `vehicleType`");
				if (results[0]) {
					returnValue = results as VehicleType[];
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}
}
