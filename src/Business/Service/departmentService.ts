import { departmentCrudInterface } from "../../Data/interface/departmentCrudInterface";
import { Department } from "../Model/MysqlModels/department";

/**
 * @author Dannique Klaver
 *
 * @class DepartmentService
 * @description This class provides methods to interact with the department data.
 */
export class DepartmentService {
	public constructor(private crudInterface: departmentCrudInterface) {}

	/**
	 * Fetches all department data.
	 * @returns {Promise<Dashboard>} The department data.
	 */
	async getDepartments(): Promise<Department[]> {
		try {
			return await this.crudInterface.getDepartments();
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
