/**
 * @author Dax Riool
 */
import express from "express";
import { app } from "../server";
import { PrivateVehicleCrud } from "../Data/crud/privateVehiclesCrud";
import { PrivateVehicleService } from "../Business/Service/privateVehicleService";
import { PrivateVehicleController } from "../Controller/privateVehicleController";
import { PrivateVehicleMysql } from "../Data/models/privateVehicles/privateVehicleMysql";
import { PrivateVehicleSequelizeMysql } from "../Data/models/privateVehicles/privateVehiclesSequelize";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { sessionMiddleware } from "../Util/middleware";

/**
 * @author Ramon iro-omo
 * na feedback van martijn is deze class aangemaakt dit zou veel code moeten besparen op de server.ts
 * @description This piece of code makes routes for the user class
 * The method userRoutes is where all of the routes are being called upon, this makes it easier and more manageble for the developer to type out new routes
 * ass you can see you can just type each route below each other and it will work
 */

export class RoutesPrivateVehicle {
	// Here the datalayer gets selected to use for queries
	private dataLayer: PrivateVehicleSequelizeMysql | PrivateVehicleMysql =
		selectDataLayer<PrivateVehicleSequelizeMysql, PrivateVehicleMysql>(
			PrivateVehicleSequelizeMysql,
			PrivateVehicleMysql
		);

	private userBysessionService: UserBySessionService =
		new UserBySessionService();
	private crudInterface: PrivateVehicleCrud = new PrivateVehicleCrud(
		this.dataLayer
	);
	private service: PrivateVehicleService = new PrivateVehicleService(
		this.crudInterface,
		this.userBysessionService
	);
	private controller: PrivateVehicleController = new PrivateVehicleController(
		this.service
	);

	constructor() {}

	private makeGetRoute(): void {
		app.get(
			"/users/privatevehicles",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.getAllPrivateVehiclesOfUserByEmail(req, res);
			}
		);
	}

	private makePushRoute(): void {
		app.post(
			"/users/delete/privatevehicle",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.deletePrivateVehicle(req, res);
			}
		);

		app.post(
			"/users/add/privatevehicle",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.createPrivateVehicle(req, res);
			}
		);
	}

	private makeDeleteRoute(): void {
		app.delete("/delete", (req: express.Request, res: express.Request) => {});
	}
	private makePutRoute(): void {
		app.put("/put", (req: express.Request, res: express.Request) => {});
	}

	public privateVehicleRoutes() {
		this.makeGetRoute();
		this.makePushRoute();
		this.makePutRoute();
		this.makeDeleteRoute();
	}
}
