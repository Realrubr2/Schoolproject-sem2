import { DepartmentCrud } from "../Data/crud/departmentCrud";
import { DepartmentService } from "../Business/Service/departmentService";
import { DepartmentController } from "../Controller/departmentController";
import express from "express";
import { app } from "../server";
import { selectDataLayer } from "../Util/dataLayerSelector";
import { DepartmentSequelizeMysql } from "../Data/models/department/departmentSequelize";
import { DepartmentMysql } from "../Data/models/department/departmentMysql";
import { sessionMiddleware } from "../Util/middleware";

export class RoutesDepartment {
	private dataLayer = selectDataLayer<
		DepartmentSequelizeMysql,
		DepartmentMysql
	>(DepartmentSequelizeMysql, DepartmentMysql);
	private crudInterface = new DepartmentCrud(this.dataLayer);
	private service = new DepartmentService(this.crudInterface);
	private controller = new DepartmentController(this.service);

	constructor() {}

	makeGetRoutes(): void {
		app.get(
			"/department",
			sessionMiddleware,
			(req: express.Request, res: express.Response) => {
				this.controller.getDepartments(req, res);
			}
		);
	}

	departmentRoutes() {
		this.makeGetRoutes();
	}
}
