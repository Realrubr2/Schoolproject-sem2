import { VehicleService } from "../Business/Service/vehicleService";

/**
 * @author Dannique Klaver
 *
 * @class VehicleController
 * @description This class is responsible for handling the vehicle routes.
 */
export class VehicleController {
	public constructor(private vehicleService: VehicleService) {}

	/**
	 * @author Dannique Klaver
	 * @description This method fetches all vehicle types.
	 *
	 * @param req The request object.
	 * @param res The response object.
	 * @returns
	 *
	 */
	async getVehicles(req: any, res: any) {
		try {
			const data = await this.vehicleService.getVehicles();
			res.json(data);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
