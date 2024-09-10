/**
 * @author Dax Riool
 */
import { PrivateVehicle } from "../../Business/Model/MysqlModels/privateVehicle";
import { PrivateVehicleCrudInterface } from "../interface/privateVehicleCrudInterface";
import { PrivateVehicleMysql } from "../models/privateVehicles/privateVehicleMysql";
import { PrivateVehicleSequelizeMysql } from "../models/privateVehicles/privateVehiclesSequelize";

/**
 * Represents the interface for a private vehicle.
 */
export class PrivateVehicleCrud implements PrivateVehicleCrudInterface {
	/**
	 * Creates an instance of PrivateVehicleInterface.
	 */
	public constructor(
		private dataLayer: PrivateVehicleMysql | PrivateVehicleSequelizeMysql
	) {}

	/**
	 * Retrieves all private vehicles of a user by email.
	 * @param email - The email of the user.
	 * @returns A promise that resolves to an array of private vehicle models, or null if no vehicles are found.
	 */
	public async getAllPrivateVehiclesOfUserByEmail(
		email: string
	): Promise<null | PrivateVehicle[]> {
		return this.dataLayer.getAllPrivateVehiclesOfUserByEmail(email);
	}

	public async createPrivateVehicle(
		privateVehicle: PrivateVehicle
	): Promise<string> {
		return this.dataLayer.createPrivateVehicle(privateVehicle);
	}
	public async deletePrivateVehicle(
		privateVehicle: PrivateVehicle
	): Promise<string> {
		return this.dataLayer.deletePrivateVehicle(privateVehicle);
	}
}
