import { CarLoanService } from "../Business/Service/carLoan/carLoanService";
import { Request, Response } from "express";
import { DateService } from "../Business/Service/carLoan/validateCarloanDate";
import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { CarLoanFactory } from "../Util/Factory/modelFactoryCarloan";

/**
 * @fileoverview This class provides the controller layer for car loans.
 * @author Storm Verwer
 */

export class CarLoanController {
	public constructor(
		private carLoanService: CarLoanService,
		private dateService: DateService = new DateService(),
		private userBySession = new UserBySessionService()
	) {}

	/**
	 * @author Storm Verwer
	 * @description Gets all cars available between two dates and an optional fuelType.
	 * This method first parses and validates the start and end dates, then creates a CarLoanSearch object with the parsed dates and optional fuelType.
	 * @param req - The Express request object, containing the start and end dates and an optional fuelType
	 * @param res - The Express response object, error message
	 */
	public async getCarsAvailableBetweenDates(req: Request, res: Response) {
		const { startDate, endDate, fuelType } = req.params;
		try {
			// Parse and validate the dates
			const [parsedStartDate, parsedEndDate] = this.dateService.parseDates(
				startDate,
				endDate
			);
			// Create the search data object
			let searchData = CarLoanFactory.getInstance().createSearch(
				parsedStartDate,
				parsedEndDate,
				fuelType
			);
			const businessvehicles =
				await this.carLoanService.getCarsAvailableBetweenDates(searchData);
			res.status(200).json(businessvehicles);
		} catch (error: any) {
			// If an error occurs, log the error and send a JSON response with status 400 and an error message
			console.error(error);
			res.status(400).json({ error: error.message });
		}
	}
	/**
	 * @author Storm Verwer
	 * @description Creates a new car loan.
	 * This method attempts to create a new car loan based on the request body. It first retrieves the user's email
	 * from their session ID, then parses and validates the start and end dates of the loan. If all data is valid,
	 * it creates a new CarLoan object and passes it to the CarLoanService to be created.
	 *
	 * @param req - The request object, should contain the car loan details in the body.
	 * @param res - The response object.
	 */
	public async createCarloan(req: Request, res: Response) {
		try {
			const email = await this.userBySession.getUserEmailBySession(
				req.cookies.sessionId
			);
			if (email) {
				const [parsedStartDate, parsedEndDate] = this.dateService.parseDates(
					req.body.startDate,
					req.body.endDate
				);

				let carLoan = CarLoanFactory.getInstance().createLoan(
					email,
					req.body.licensePlate,
					parsedStartDate,
					parsedEndDate
				);
				const createdCarloan = await this.carLoanService.createCarloan(carLoan);
				res.status(201).json(createdCarloan);
				return createdCarloan;
			}
		} catch (error: any) {
			if (error.message === "Session id is empty") {
				res.status(401).json("No session found");
			} else {
				console.error(error);
				res.status(400).json("Failed to create carloan");
			}
		}
	}
}
