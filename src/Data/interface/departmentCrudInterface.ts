import { Department } from "../../Business/Model/MysqlModels/department";

/**
 * @author Dannique Klaver
 * @description Interface for the department CRUD operations
 */
export interface departmentCrudInterface {
	getDepartments(): Promise<Department[]>;
}
