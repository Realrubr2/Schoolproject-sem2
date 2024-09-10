import PrivateVehicleSequelize from "../../../Business/Model/SequelizeModels/privateVehicle";
import {
	convertRowDataToModel,
	convertRowDataToModels,
} from "../../../Util/Factory/rowDataModelFactory";
import { PrivateVehicleCrudInterface } from "../../interface/privateVehicleCrudInterface";
import { PrivateVehicle } from "../../../Business/Model/MysqlModels/privateVehicle";
import { RowDataPacket } from "mysql2";

/**
 * Represents a class that interacts with the PrivateVehicle table in the database using Sequelize ORM for MySQL.
 */
export class PrivateVehicleSequelizeMysql
	implements PrivateVehicleCrudInterface
{
	/**
	 * Retrieves all private vehicles of a user by their email.
	 * Checks if the user has privatevehicles in the database
	 * If he does convert the data to models and return them
	 * If not return null
	 * @param email - The email of the user.
	 * @returns A promise that resolves to an array of PrivateVehicleModel objects or null if no vehicles are found.
	 */
	public async getAllPrivateVehiclesOfUserByEmail(
		email: string
	): Promise<null | PrivateVehicle[]> {
		let returnValue: null | PrivateVehicle[] = null;
		try {
			const result = await PrivateVehicleSequelize.findAll({
				where: { email: email },
			});
			if (result.length > 0) {
				returnValue = convertRowDataToModels<PrivateVehicle>(
					result,
					["email", "vehicleType", "fuelType"],
					PrivateVehicle
				);
			}
		} catch (error) {
			console.log(error);
		}
		return returnValue;
	}

	/**
	 * creates a private vehicle for a user.
	 * @param email the email of the user
	 * @param vehicleType the type of vehicle
	 * @param fuelType the type of fuel the vehicle uses
	 * @returns a string that says the vehicle is added
	 */
	public async createPrivateVehicle(
		privateVehicle: PrivateVehicle
	): Promise<string> {
		try {
			const email = privateVehicle.getEmail();
			const vehicleType = privateVehicle.getVehicleType();
			const fuelType = privateVehicle.getFuelType();

			await PrivateVehicleSequelize.create({
				email: email,
				vehicleType: vehicleType,
				fuelType: fuelType,
			});
		} catch (error) {
			console.log(error);
		}
		return "Voertuig toegevoegd";
	}

	/**
	 * This function deletes a private vehicle from the database.
	 * @param email the email of the user
	 * @param vehicleType the type of vehicle
	 * @param fuelType the type of fuel the vehicle uses
	 * @returns a string that says the vehicle is deleted
	 */
	public async deletePrivateVehicle(
		privateVehicle: PrivateVehicle
	): Promise<string> {
		try {
			const email = privateVehicle.getEmail();
			const vehicleType = privateVehicle.getVehicleType();
			const fuelType = privateVehicle.getFuelType();

			await PrivateVehicleSequelize.destroy({
				where: {
					email: email,
					vehicleType: vehicleType,
					fuelType: fuelType,
				},
			});
		} catch (error) {
			console.log(error);
		}
		return "Voertuig verwijderd";
	}
}
