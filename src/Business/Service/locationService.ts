/**
 * @author Dax Riool
 */
import { locationCrudInterface } from "../../Data/interface/locationCrudInterface";

/**
 * @description This class implements the CRUD operations for the user and checks for wich datalayer is used
 * it uses the locationCrudInterface
 */
export class LocationService {
	public constructor(private crudinterface: locationCrudInterface) {}

	/**
	 *
	 * @param email the email of the user
	 * @returns a list of locations from the user
	 */
	getAllLocationsOfUserByEmail(email: string) {
		return this.crudinterface.getAllLocationsOfUserByEmail(email);
	}
}
