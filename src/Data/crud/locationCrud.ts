/**
 * @author Dax Riool
 */
import { Location } from "../../Business/Model/MysqlModels/location";
import { locationCrudInterface } from "../interface/locationCrudInterface";
import { LocationMysql } from "../models/locations/locationMysql";
import { LocationSequelizeMysql } from "../models/locations/locationSequelize";

/**
 * Represents the LocationInterface class that implements the locationCrudInterface.
 */
export class LocationCrud implements locationCrudInterface {
	public constructor(
		private dataLayer: LocationSequelizeMysql | LocationMysql
	) {}
	/**
	 * Retrieves all locations of a user by their email.
	 * @param email - The email of the user.
	 * @returns A promise that resolves to an array of locationModel objects or null if no locations are found.
	 */
	async getAllLocationsOfUserByEmail(
		email: string
	): Promise<null | Location[]> {
		return (await this.dataLayer.getAllLocationsOfUserByEmail(
			email
		)) as Location[];
	}
}
