import { travel } from "../../Business/Model/Interfaces/travel";
import { Dashboard } from "../../Business/Model/MysqlModels/dashboard";
import { travelCrudInterface } from "../interface/travelCrudInterface";
import { TravelMysql } from "../models/travel/travelMysql";
import { TravelSequelizeMysql } from "../models/travel/travelSequelize";

/**
 * @author Dannique Klaver
 * @description This class implements the CRUD operations for the travel data and checks which data layer is used.
 */
export class TravelCrud implements travelCrudInterface {
	public constructor(private dataLayer: TravelSequelizeMysql | TravelMysql) {}

	/**
	 * @author Dannique Klaver
	 * @description Fetches all travel data with optional filters.
	 *
	 * @param {Object} filters - Optional filters for department, vehicleType, and fuelType.
	 * @returns {Promise<Dashboard[]>} The travel data.
	 */
	async getAllDashboardData(filters?: {
		department?: string;
		vehicleType?: string;
		fuelType?: string;
	}): Promise<Dashboard[]> {
		return await this.dataLayer.getAllDashboardData(filters);
	}

	/**
	 * @author Dannique Klaver
	 * @description Fetches travel data based on the provided filters.
	 *
	 * @param {Object} dates - The start and end dates for the travel data.
	 * @param {Object} filters - Filters for department, vehicleType, and fuelType.
	 * @returns {Promise<Dashboard[]>} The filtered travel data.
	 */
	async getFilteredDashboardData(
		dates: { start: Date; end: Date },
		filters?: {
			department?: string;
			vehicleType?: string;
			fuelType?: string;
		}
	): Promise<Dashboard[]> {
		return await this.dataLayer.getFilteredDashboardData(dates, filters);
	}
	async getPastRides(email: string): Promise<travel[] | null> {
		return await this.dataLayer.getPastRides(email);
	}

	async createTravel(): Promise<void> {
		// Create a new travel registration in the database
	}

	async getTravel(): Promise<void> {
		// Get a travel registration from the database
	}

	async updateTravel(): Promise<void> {
		// Update a travel in the database
	}

	async deleteTravel(): Promise<void> {
		// Delete a travel from the database
	}
}
