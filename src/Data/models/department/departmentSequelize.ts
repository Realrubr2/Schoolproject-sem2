import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";
import departmentSequelize from "../../../Business/Model/SequelizeModels/department";
import { departmentCrudInterface } from "../../interface/departmentCrudInterface";
import { Department } from "../../../Business/Model/MysqlModels/department";

/**
 * @author Dannique Klaver
 * @description This class is responsible for getting the department data from the database.
 *
 * @methods getDepartments() retrieves all department types.
 */
export class DepartmentSequelizeMysql implements departmentCrudInterface {
	async getDepartments(): Promise<Department[]> {
		const departmentTypes = await departmentSequelize.findAll();
		if (departmentTypes && departmentTypes.length > 0) {
			return convertRowDataToModels<Department>(
				departmentTypes,
				["department"],
				Department
			);
		} else {
			return [];
		}
	}
}
