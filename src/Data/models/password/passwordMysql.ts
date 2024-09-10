import { RelationalDatabase } from "../../../Util/relationalDatabase";
import { RowDataPacket } from "mysql2";
import { passwordCrudInterface } from "../../interface/passwordCrudInterface";
import { Password } from "../../../Business/Model/MysqlModels/password";
import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";

/**
 * @author Dannique Klaver
 * @description This class is responsible for getting the password data from the database.
 *
 * @methods getPasswordsByEmail() retrieves all private vehicles of a user by their email.
 */
export class PasswordMysql implements passwordCrudInterface {
	private pool = RelationalDatabase.getPool();

	/**
	 * @author Dannique Klaver
	 * @description Retrieves all the passwords of a user by their email.
	 *
	 * @param {string} email - The email of the user.
	 * @returns {Promise<password[] | null>} - A promise that resolves to an array of password objects or null if no passwords are found.
	 */
	public async getPasswordsByEmail(email: string): Promise<Password[]> {
		let returnValue: Password[] = [];
		const modelAttributes = [
			"registerDate",
			"email",
			"hashedPassword",
			"expiryDate",
		];
		if (this.pool) {
			try {
				const [results, _field] = await this.pool
					.promise()
					.execute<RowDataPacket[]>(
						"SELECT * FROM `password` where email = ?",
						[email]
					);
				if (results[0]) {
					returnValue = convertRowDataToModels<Password>(
						results,
						modelAttributes,
						Password
					);
				}
			} catch (error) {
				console.log(error);
			}
		}
		return returnValue;
	}
}
