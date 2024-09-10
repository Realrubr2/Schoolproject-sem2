import { Department } from "../../Business/Model/MysqlModels/department";
import { departmentCrudInterface } from "../interface/departmentCrudInterface";
import { DepartmentMysql } from "../models/department/departmentMysql";
import { DepartmentSequelizeMysql } from "../models/department/departmentSequelize";

/**
 * @author Dannique Klaver
 * @description This class implements the CRUD operations for the login and checks for which datalayer is used
 */
export class DepartmentCrud implements departmentCrudInterface {
	public constructor(
		private dataLayer: DepartmentSequelizeMysql | DepartmentMysql
	) {}

	async createDepartment(name: string): Promise<void> {
		// Create a new department registration in the database
	}

	/**
	 * @author Dannique Klaver
	 * @description This method fetches all department types.
	 *
	 * @returns {Promise<department[]>} The department data.
	 */
	async getDepartments(): Promise<Department[]> {
		return this.dataLayer.getDepartments();
	}

	async updateDepartment(): Promise<void> {
		// Update a login in the database
	}

	async deleteDepartment(): Promise<void> {
		// Delete a login from the database
	}
}
