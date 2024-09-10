import { travel } from "../Business/Model/Interfaces/travel";
import { TravelServiceHandler } from "../Business/Service/travel/travelServiceHandler";
import { Request, Response } from "express";

/**
 * @author Dannique Klaver
 *
 * @class TravelController
 * @description This class is responsible for handling the travel routes.
 */
export class TravelController {
	public constructor(private travelService: TravelServiceHandler) {}

	/**
	 * @author Dannique Klaver
	 *
	 */
	async getDashboardData(req: any, res: any) {
		try {
			// Destructure filters from the request body
			const filters = {
				department: req.query.department,
				vehicleType: req.query.vehicleType,
				fuelType: req.query.fuelType,
			};

			// Fetch all data
			const data = await this.travelService.getAllDashboardData(filters);
			res.json(data);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}

	async getDashboardDataBetweenDates(req: any, res: any) {
		try {
			// Destructure start and end dates from the request parameters
			const dates = { start: req.params.start, end: req.params.end };

			// Destructure filters from the request body
			const filters = {
				department: req.query.department,
				vehicleType: req.query.vehicleType,
				fuelType: req.query.fuelType,
			};

			// Fetch data based on the provided filters and dates
			const data = await this.travelService.getFilteredDashboardData(
				dates,
				filters
			);
			res.json(data);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
	/**
	 * Returns the past travels of a user
	 * if there is no session id present or it is not found the user gets a 401 status
	 * if there is no past rides it returns a 204
	 * if there are rides found it will return an array of travel and a status of 202
	 * @param req express request
	 * @param res express response
	 */
	async getPastRides(req: Request, res: Response) {
		let pastRides: travel[] | null = null;
		try {
			pastRides = await this.travelService.getPastRides(req.cookies.sessionId);
		} catch (error: unknown) {
			res.status(404).json({ error });
		}
		if (pastRides !== null && pastRides!.length > 0) {
			res.status(202).json({ pastRides });
		} else {
			res.status(204).end();
		}
	}
}
