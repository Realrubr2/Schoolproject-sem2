/**
 * @author Dax Riool
 */
import { PrivateVehicleService } from "../Business/Service/privateVehicleService";
import { Request, Response } from "express";

/**
 * Controller class for managing private vehicles.
 */
export class PrivateVehicleController {
	/**
	 * Creates an instance of PrivateVehicleController.
	 * @param privateVehicle The private vehicle service.
	 */
	public constructor(private privateVehicle: PrivateVehicleService) {}

	/**
	 * Retrieves all private vehicles of a user by email.
	 * @description This method calls the getAllPrivateVehiclesOfUserByEmail method from the privateVehicle service.
	 * @param req The request object.
	 * @param res The response object.
	 */
	public async getAllPrivateVehiclesOfUserByEmail(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			const user = await this.privateVehicle.getAllPrivateVehiclesOfUserByEmail(
				req
			);
			res.status(202).json(user);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}

	/**
	 * Creates a private vehicle.
	 * @description this method calls the createPrivateVehicle method from the privateVehicle service.
	 * @param req The request object.
	 * @param res The response object.
	 */
	public async createPrivateVehicle(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			// calls the createPrivateVehicle method from the privateVehicle service
			const user = await this.privateVehicle.createPrivateVehicle(req);
			res.status(202).json(user);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	/**
	 * Deletes a private vehicle.
	 * @description This method calls the deletePrivateVehicle method from the privateVehicle service.
	 * @param req the request object
	 * @param res the response object
	 */
	public async deletePrivateVehicle(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			// calls the deletePrivateVehicle method from the privateVehicle service
			const user = await this.privateVehicle.deletePrivateVehicle(req);
			res.status(202).json(user);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
