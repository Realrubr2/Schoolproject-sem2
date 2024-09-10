import { DepartmentService } from "../Business/Service/departmentService";

/**
 * @author Dannique Klaver
 *
 * @class DepartmentController
 * @description This class is responsible for handling the department routes.
 */
export class DepartmentController {
	public constructor(private departmentService: DepartmentService) {}

	/**
	 * @author Dannique Klaver
	 * @description This method fetches all departments.
	 *
	 * @param req The request object.
	 * @param res The response object.
	 *
	 */
	async getDepartments(req: any, res: any) {
		try {
			const data = await this.departmentService.getDepartments();
			res.json(data);
		} catch (error: any) {
			res.status(400).json({ error: error.message });
		}
	}
}
