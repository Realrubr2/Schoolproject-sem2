/**
 * @author Dax Riool
 */
import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { RowDataPacket } from "mysql2";
import { PrivateVehicle } from "../../../Business/Model/MysqlModels/privateVehicle";
import { PrivateVehicleCrudInterface } from "../../interface/privateVehicleCrudInterface";
import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";
/**
 * Represents a MySQL implementation of the PrivateVehicle CRUD interface.
 */
/**
 * Represents a class that interacts with the MySQL database for private vehicles.
 */
export class PrivateVehicleMysql implements PrivateVehicleCrudInterface {
	private pool = RelationalDatabase.getPool();

	/**
	 * Retrieves all private vehicles of a user by their email.
	 * @param email - The email of the user.
	 * @returns A promise that resolves to an array of PrivateVehicle objects or null if no vehicles are found.
	 */
	public async getAllPrivateVehiclesOfUserByEmail(
		email: string
	): Promise<null | PrivateVehicle[]> {
		let returnValue: null | PrivateVehicle[] = null;
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(
						"SELECT * FROM `privatevehicle` where email = ?",
						[email]
					);
				if (results[0]) {
					returnValue = convertRowDataToModels<PrivateVehicle>(
						results,
						["email", "vehicleType", "fuelType"],
						PrivateVehicle
					);
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}

	/**
	 * Adds a private vehicle to the database.
	 * @param email - The email of the user.
	 * @param vehicleType - The type of vehicle.
	 * @param fuelType - The type of fuel.
	 * @returns A promise that resolves to the added private vehicle.
	 */
	public async createPrivateVehicle(
		privateVehicle: PrivateVehicle
	): Promise<string> {
		if (this.pool) {
			const email = privateVehicle.getEmail();
			const vehicleType = privateVehicle.getVehicleType();
			const fuelType = privateVehicle.getFuelType();
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(
						"INSERT INTO privatevehicle (email, vehicleType, fuelType) VALUES (?, ?, ?)",
						[email, vehicleType, fuelType]
					);
			} catch (error) {
				console.log(error);
			}
		}
		return "Voertuig toegevoegd";
	}

	/**
	 * This function deletes a private vehicle from the database.
	 * @param email the email of the user
	 * @param vehicleType the type of vehicle
	 * @param fuelType the type of fuel the vehicle uses
	 * @returns
	 */
	public async deletePrivateVehicle(
		privateVehicle: PrivateVehicle
	): Promise<string> {
		if (this.pool) {
			const email = privateVehicle.getEmail();
			const vehicleType = privateVehicle.getVehicleType();
			const fuelType = privateVehicle.getFuelType();
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(
						"DELETE FROM privatevehicle WHERE email = ? AND vehicleType = ? AND fuelType = ?",
						[email, vehicleType, fuelType]
					);
			} catch (error) {
				console.log(error);
			}
		}
		return "Voertuig verwijderd";
	}
}
