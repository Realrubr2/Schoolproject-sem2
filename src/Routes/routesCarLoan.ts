import { CarLoanCrud } from "../Data/crud/carLoanCrud";
import { CarLoanService } from "../Business/Service/carLoan/carLoanService";
import { CarLoanController } from "../Controller/carLoanController";
import express from "express";
import { app } from "../server";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { CarLoanSequelizeMysql } from "../Data/models/carLoan/carLoanSequelize";
import { CarLoanMysql } from "../Data/models/carLoan/carLoanMysql";
import { sessionMiddleware } from "../Util/middleware";

/**
 * @fileoverview This class provides the routes for car loans.
 * @author Storm Verwer
 */

export class RoutesCarLoan {
	private dataLayer = selectDataLayer<CarLoanSequelizeMysql, CarLoanMysql>(
		CarLoanSequelizeMysql,
		CarLoanMysql
	);
	private crudInterface = new CarLoanCrud(this.dataLayer);
	private service = new CarLoanService(this.crudInterface);
	private controller = new CarLoanController(this.service);

	constructor() {}

	private makeGetRoutes(): void {
		app.get(
			"/cars/:startDate/:endDate/:fuelType?",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.getCarsAvailableBetweenDates(req, res);
			}
		);
	}

	private makePostRoutes(): void {
		app.post("/cars/loan", sessionMiddleware, (req, res) => {
			this.controller.createCarloan(req, res);
		});
	}

	public carLoanRoutes() {
		this.makeGetRoutes();
		this.makePostRoutes();
	}
}
