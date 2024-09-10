/**
 * @author Dax Riool
 */
import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { LocationService } from "../Business/Service/locationService";
/**
 * Controller class for handling location-related operations.
 */
export class LocationController {
	/**
	 * @description Creates an instance of LocationController.
	 * @param {LocationService} locationService - The location service used for retrieving location data.
	 */
	public constructor(private locationService: LocationService) {}

	/**
	 * @description Retrieves all locations of a user by email.
	 * @param {any} req - The request object.
	 * @param {any} res - The response object.
	 */
	async getAllLocationsOfUserByEmail(req: any, res: any) {
		try {
			const userBySessionService = new UserBySessionService();
			const sessionId = req.cookies.sessionId;

			const email = await userBySessionService.getUserEmailBySession(sessionId);
			if (email) {
				const user = await this.locationService.getAllLocationsOfUserByEmail(
					email
				);
				res.status(202).json(user);
			}
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
