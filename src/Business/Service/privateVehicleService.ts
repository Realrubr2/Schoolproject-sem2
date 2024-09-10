/**
 * @author Dax Riool
 */
import { PrivateVehicleCrudInterface } from "../../Data/interface/privateVehicleCrudInterface";
import { PrivateVehicle } from "../Model/MysqlModels/privateVehicle";
import { UserBySessionService } from "./UserBySessionService";
import { Request } from "express";
/**
 * Service class for managing private vehicles.
 */
export class PrivateVehicleService {
	/**
	 * Creates an instance of PrivateVehicleService.
	 * @param {PrivateVehicleCrudInterface} crudinterface - The CRUD interface for private vehicles.
	 */
	public constructor(
		private crudinterface: PrivateVehicleCrudInterface,
		private userBySessionService: UserBySessionService
	) {}

	/**
	 * Retrieves all private vehicles of a user by their email.
	 * @param {string} email - The email of the user.
	 * @returns {Promise<PrivateVehicle[] | null>} - A promise that resolves to the list of private vehicles.
	 */
	public async getAllPrivateVehiclesOfUserByEmail(
		req: Request
	): Promise<PrivateVehicle[] | null> {
		const sessionId = req.cookies.sessionId;
		const email = await this.userBySessionService.getUserEmailBySession(
			sessionId
		);

		if (email !== null) {
			// here we call the either the sequelize or mysql crud to get all private vehicles of a user by their email
			const vehicles =
				this.crudinterface.getAllPrivateVehiclesOfUserByEmail(email);

			return vehicles;
		}
		throw new Error("no session found");
	}

	/**
	 * Creates a private vehicle for a user.
	 * Also checks if the user already has a vehicle that has the same vehicle and fuel type.
	 * @param email the email of the user
	 * @param vehicleType the type of vehicle
	 * @param fuelType the type of fuel the vehicle uses
	 * @returns
	 */
	public async createPrivateVehicle(req: Request): Promise<string> {
		if (!req.body.vehicleType || !req.body.fuelType) {
			throw new Error("Vul alle velden in");
		} else {
			const sessionId = req.cookies.sessionId;

			const email = await this.userBySessionService.getUserEmailBySession(
				sessionId
			);

			if (email !== null) {
				const vehicles =
					await this.crudinterface.getAllPrivateVehiclesOfUserByEmail(email);

				if (vehicles) {
					for (let vehicle of vehicles) {
						let vehicleType = vehicle.getVehicleType();
						let fuelType = vehicle.getFuelType();
						if (
							vehicleType === req.body.vehicleType &&
							fuelType === req.body.fuelType
						) {
							throw new Error("Dit voertuig bestaat al");
						}
					}
				}
				const privateVehicle = new PrivateVehicle(
					email,
					req.body.vehicleType,
					req.body.fuelType
				);
				return this.crudinterface.createPrivateVehicle(privateVehicle);
			}
			throw new Error("no session found");
		}
	}

	public async deletePrivateVehicle(req: Request): Promise<string> {
		const sessionId = req.cookies.sessionId;
		const email = await this.userBySessionService.getUserEmailBySession(
			sessionId
		);
		if (email !== null) {
			const vehicles =
				await this.crudinterface.getAllPrivateVehiclesOfUserByEmail(email);
			if (vehicles) {
				for (const vehicle of vehicles) {
					let vehicleType = vehicle.getVehicleType();
					let fuelType = vehicle.getFuelType();
					if (
						vehicleType === req.body.vehicleType &&
						fuelType === req.body.fuelType
					) {
						const privateVehicle = new PrivateVehicle(
							email,
							req.body.vehicleType,
							req.body.fuelType
						);
						return this.crudinterface.deletePrivateVehicle(privateVehicle);
					}
				}
			}
			throw new Error("Dit voertuig bestaat niet");
		}
		throw new Error("no session found");
	}
}
