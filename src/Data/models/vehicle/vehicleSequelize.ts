import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";
import VehicleTypeSequelize from "../../../Business/Model/SequelizeModels/vehicletype";
import { vehicleCrudInterface } from "../../interface/vehicleCrudInterface";
import { VehicleType } from "../../../Business/Model/MysqlModels/vehicletype";

/**
 * @author Dannique Klaver
 * @description This class is responsible for getting the vehicle data from the database.
 *
 * @methods getVehicles() retrieves all vehicle types.
 */
export class VehicleSequelizeMysql implements vehicleCrudInterface {
	async getVehicles(): Promise<VehicleType[]> {
		const vehicleTypes = await VehicleTypeSequelize.findAll();
		if (vehicleTypes && vehicleTypes.length > 0) {
			return convertRowDataToModels<VehicleType>(
				vehicleTypes,
				["vehicleType", "fuelType", "gcorkm"],
				VehicleType
			);
		} else {
			return [];
		}
	}
}
