import { VehicleType } from "../../Business/Model/MysqlModels/vehicletype";

/**
 * @author Dannique Klaver
 * @description Interface for the vehicle CRUD operations
 *
 * @method getVehicles() Fetches all vehicle data.
 */
export interface vehicleCrudInterface {
	getVehicles(): Promise<VehicleType[]>;
}
