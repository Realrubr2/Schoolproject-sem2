import { PrivateVehicle } from "../../Business/Model/MysqlModels/privateVehicle";

/**
 * @author Dax Riool
 * Interface for the CRUD operations on the private vehicle table
 */
export interface PrivateVehicleCrudInterface {
	getAllPrivateVehiclesOfUserByEmail(
		email: string
	): Promise<null | PrivateVehicle[]>;
	createPrivateVehicle(privateVehicle: PrivateVehicle): Promise<string>;
	deletePrivateVehicle(privateVehicle: PrivateVehicle): Promise<string>;
}
