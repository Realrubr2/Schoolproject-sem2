/**
 * @author Dax Riool
 */
import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { RowDataPacket } from "mysql2";
import { Location } from "../../../Business/Model/MysqlModels/location";
import { locationCrudInterface } from "../../interface/locationCrudInterface";
import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";

/**
 * Represents a MySQL implementation of the location CRUD interface.
 */
export class LocationMysql implements locationCrudInterface {
	private pool = RelationalDatabase.getPool();

	/**
	 * Retrieves all locations associated with a user's email.
	 * @param email - The email of the user.
	 * @returns A promise that resolves to an array of location models, or null if no locations are found.
	 */
	public async getAllLocationsOfUserByEmail(
		email: string
	): Promise<null | Location[]> {
		let returnValue: null | Location[] = null;
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(
						"SELECT * FROM `location` where email = ?",
						[email]
					);
				if (results[0]) {
					returnValue = convertRowDataToModels<Location>(
						results,
						["email", "location"],
						Location
					);
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}
}
