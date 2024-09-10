import express from "express";
import { app } from "../server";
import { LocationCrud } from "../Data/crud/locationCrud";
import { LocationService } from "../Business/Service/locationService";
import { LocationController } from "../Controller/locationController";
import { LocationSequelizeMysql } from "../Data/models/locations/locationSequelize";
import { LocationMysql } from "../Data/models/locations/locationMysql";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { sessionMiddleware } from "../Util/middleware";

/**
 * @author Ramon iro-omo
 * na feedback van martijn is deze class aangemaakt dit zou veel code moeten besparen op de server.ts
 * @description This piece of code makes routes for the user class
 * The method userRoutes is where all of the routes are being called upon, this makes it easier and more manageble for the developer to type out new routes
 * ass you can see you can just type each route below each other and it will work
 */

export class RoutesLocation {
	// Here the datalayer gets selected to use for queries
	private dataLayer = selectDataLayer<LocationSequelizeMysql, LocationMysql>(
		LocationSequelizeMysql,
		LocationMysql
	);

	private crudInterface = new LocationCrud(this.dataLayer);
	private service = new LocationService(this.crudInterface);
	private controller = new LocationController(this.service);

	constructor() {}

	makeGetRoute(): void {
		app.get(
			"/users/locations",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.getAllLocationsOfUserByEmail(req, res);
			}
		);
	}
	makePushRoute(): void {}
	makeDeleteRoute(): void {
		app.delete("/delete", (req: express.Request, res: express.Request) => {});
	}
	makePutRoute(): void {
		app.put("/put", (req: express.Request, res: express.Request) => {});
	}

	injectService() {}

	locationRoutes() {
		this.makeGetRoute();
		this.makePushRoute();
		this.makePutRoute();
		this.makeDeleteRoute();
	}
}
