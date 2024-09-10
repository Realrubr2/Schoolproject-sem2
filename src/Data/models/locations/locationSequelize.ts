/**
 * @author Dax Riool
 */
import LocationSequelize from "../../../Business/Model/SequelizeModels/location";
import {
	convertRowDataToModel,
	convertRowDataToModels,
} from "../../../Util/Factory/rowDataModelFactory";
import { locationCrudInterface } from "../../interface/locationCrudInterface";
import { Location } from "../../../Business/Model/MysqlModels/location";

/**
 * Represents a class that implements the locationCrudInterface and provides methods for retrieving locations from a MySQL database using Sequelize.
 */
export class LocationSequelizeMysql implements locationCrudInterface {
	/**
	 * Retrieves all locations associated with a user's email from the database.
	 * @param email - The email of the user.
	 * @returns A Promise that resolves to an array of locationModel objects if locations are found, or null if no locations are found.
	 */
	async getAllLocationsOfUserByEmail(
		email: string
	): Promise<null | Location[]> {
		let returnValue: null | Location[] = null;
		try {
			const locations = await LocationSequelize.findAll({
				where: {
					email: email,
				},
			});
			if (locations) {
				returnValue = convertRowDataToModels<Location>(
					locations,
					["email", "location"],
					Location
				);
			}
		} catch (error) {
			console.log(error);
		}
		return returnValue;
	}
}
