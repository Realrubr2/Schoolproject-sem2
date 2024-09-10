import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { RowDataPacket } from "mysql2";
import { Department } from "../../../Business/Model/MysqlModels/department";
import { departmentCrudInterface } from "../../interface/departmentCrudInterface";
import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";

/**
 * @author Dannique Klaver
 * @description This class is responsible for getting the department data from the database.
 *
 * @methods getDepartments() retrieves all department types.
 */
export class DepartmentMysql implements departmentCrudInterface {
	private pool = RelationalDatabase.getPool();

	/**
	 * @author Dannique Klaver
	 * @description Retrieves all the department types.
	 *
	 * @returns {Promise<DepartmentType[]>} - A promise that resolves to an array of department objects.
	 */
	public async getDepartments(): Promise<Department[]> {
		let returnValue: Department[] = [];
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>("SELECT * FROM `department`");
				if (results[0]) {
					returnValue = convertRowDataToModels<Department>(
						results,
						["department"],
						Department
					);
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}
}
