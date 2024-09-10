import { VehicleType } from "../../Business/Model/MysqlModels/vehicletype";
import { vehicleCrudInterface } from "../interface/vehicleCrudInterface";
import { VehicleMysql } from "../models/vehicle/vehicleMysql";
import { VehicleSequelizeMysql } from "../models/vehicle/vehicleSequelize";

/**
 * @author Dannique Klaver
 * @description This class implements the CRUD operations for the login and checks for which datalayer is used
 */
export class VehicleCrud implements vehicleCrudInterface {
	//controls which data layer is used
	public constructor(private dataLayer: VehicleSequelizeMysql | VehicleMysql) {}

	async createVehicle(name: string): Promise<void> {
		// Create a new vehicle registration in the database
	}

	/**
	 * @author Dannique Klaver
	 * @description This method fetches all vehicle types.
	 *
	 * @returns {Promise<VehicleType[]>} The vehicle data.
	 */
	async getVehicles(): Promise<VehicleType[]> {
		return this.dataLayer.getVehicles();
	}

	async updateVehicle(): Promise<void> {
		// Update a login in the database
	}

	async deleteVehicle(): Promise<void> {
		// Delete a login from the database
	}
}
