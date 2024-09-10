import { TravelServiceHandler } from "../Business/Service/travel/travelServiceHandler";
import { TravelController } from "../Controller/travelController";
import express from "express";
import { app } from "../server";
import { TravelCrud } from "../Data/crud/travelCrud";
import { TravelSequelizeMysql } from "../Data/models/travel/travelSequelize";
import { TravelMysql } from "../Data/models/travel/travelMysql";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { TravelDateValidationService } from "../Business/Service/travel/travelDateValidationService";
import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { sessionMiddleware } from "../Util/middleware";

export class RoutesTravel {
	private dataLayer = selectDataLayer<TravelSequelizeMysql, TravelMysql>(
		TravelSequelizeMysql,
		TravelMysql
	);
	private userBySession = new UserBySessionService();
	private crudInterface = new TravelCrud(this.dataLayer);
	private dateService = new TravelDateValidationService();
	private service = new TravelServiceHandler(
		this.dateService,
		this.crudInterface,
		this.userBySession
	);
	private controller = new TravelController(this.service);

	constructor() {}

	/**
	 * @author Dannique Klaver
	 * @description This class makes routes for the travel data
	 *
	 * @method makeGetRoutes This method sets up all the GET routes for the travel data
	 * @method travelRoutes This method sets up all the routes related to travel
	 *
	 */

	makeGetRoutes(): void {
		/**
		 * Route to fetch all CO2 emission data.
		 * The filters (if any) are expected to be in the request body.
		 */
		app.get(
			"/dashboard",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.getDashboardData(req, res);
			}
		);

		/**
		 * Route to fetch CO2 emission data between specific dates.
		 * The start and end dates are expected to be in the request parameters.
		 * Any additional filters are expected to be in the request body.
		 */
		app.get(
			"/dashboard/:start/:end",
			(req: express.Request, res: express.Response) => {
				this.controller.getDashboardDataBetweenDates(req, res);
			}
		);
		/**
		 * @author Ramon iro-omo
		 * gets the rides that are a week old of the user
		 */
		app.get("/getpastrides", (req: express.Request, res: express.Response) => {
			this.controller.getPastRides(req, res);
		});
	}

	/**
	 * This method sets up all the routes related to travel.
	 */
	travelRoutes() {
		this.makeGetRoutes();
	}
}
