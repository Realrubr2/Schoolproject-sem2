import { VehicleCrud } from "../Data/crud/vehicleCrud";
import { VehicleService } from "../Business/Service/vehicleService";
import { VehicleController } from "../Controller/vehicleController";
import express from "express";
import { app } from "../server";
import { VehicleSequelizeMysql } from "../Data/models/vehicle/vehicleSequelize";
import { VehicleMysql } from "../Data/models/vehicle/vehicleMysql";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { sessionMiddleware } from "../Util/middleware";

/**
 * @author Dannique Klaver
 * @description This class makes routes for the vehicle class
 * @methods makeVehicleRoute() makes a get route for the vehicle
 * @methods vehicleRoutes() calls the makeVehicleRoute() method
 */
export class RoutesVehicle {
	private dataLayer = selectDataLayer<VehicleSequelizeMysql, VehicleMysql>(
		VehicleSequelizeMysql,
		VehicleMysql
	);
	private crudInterface = new VehicleCrud(this.dataLayer);
	private service = new VehicleService(this.crudInterface);
	private controller = new VehicleController(this.service);

	constructor() {}

	makeGetRoutes(): void {
		app.get(
			"/vehicle",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.getVehicles(req, res);
			}
		);
	}

	vehicleRoutes() {
		this.makeGetRoutes();
	}
}
