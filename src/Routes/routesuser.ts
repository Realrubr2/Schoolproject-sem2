import { UserCrud } from "../Data/crud/userCrud";
import { UserService } from "../Business/Service/userService";
import { UserController } from "../Controller/userController";
import express from "express";
import { app } from "../server";
import { LocationCrud } from "../Data/crud/locationCrud";
import { LocationService } from "../Business/Service/locationService";
import { LocationController } from "../Controller/locationController";
import { PrivateVehicleCrud } from "../Data/crud/privateVehiclesCrud";
import { PrivateVehicleService } from "../Business/Service/privateVehicleService";
import { PrivateVehicleController } from "../Controller/privateVehicleController";
import { SessionCrud } from "../Data/crud/sessionCrud";
import { PrivateVehicleMysql } from "../Data/models/privateVehicles/privateVehicleMysql";
import { PrivateVehicleSequelizeMysql } from "../Data/models/privateVehicles/privateVehiclesSequelize";
import { LocationSequelizeMysql } from "../Data/models/locations/locationSequelize";
import { LocationMysql } from "../Data/models/locations/locationMysql";
import { SessionMysql } from "../Data/models/session/sessionMysql";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { SessionService } from "../Business/Service/sessionService";
import { UserSequelizeMysql } from "../Data/models/users/userSequelize";
import { UserMysql } from "../Data/models/users/userMysql";
import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { sessionMiddleware } from "../Util/middleware";

/**
 * @author Ramon iro-omo
 * na feedback van martijn is deze class aangemaakt dit zou veel code moeten besparen op de server.ts
 * @description This piece of code makes routes for the user class
 * The method userRoutes is where all of the routes are being called upon, this makes it easier and more manageble for the developer to type out new routes
 * ass you can see you can just type each route below each other and it will work
 */

export class RoutesUser {
	private dataLayer = selectDataLayer<UserSequelizeMysql, UserMysql>(
		UserSequelizeMysql,
		UserMysql
	);
	private crudInterface = new UserCrud(this.dataLayer);
	private service = new UserService(this.crudInterface);
	private controller = new UserController(
		this.service,
		new UserBySessionService()
	);

	constructor() {}

	makeGetRoute(): void {
		app.get(
			"/users",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.getAllUsers(req, res);
			}
		);

		app.get(
			"/user",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.getUserByEmail(req, res);
			}
		);
	}
	makePushRoute(): void {
		app.post(
			"/logout",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.logOutUser(req, res);
			}
		);
	}
	makeDeleteRoute(): void {
		app.delete(
			"/delete",
			sessionMiddleware,
			(req: express.Request, res: express.Request) => {}
		);
	}
	makePutRoute(): void {
		app.put(
			"/put",
			sessionMiddleware,
			(req: express.Request, res: express.Request) => {}
		);
	}

	injectService() {}

	userRoutes() {
		this.makeGetRoute();
		this.makePushRoute();
		this.makePutRoute();
		this.makeDeleteRoute();
	}
}
