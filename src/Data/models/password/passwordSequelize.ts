import PasswordSequelize from "../../../Business/Model/SequelizeModels/password";
import { convertRowDataToModels } from "../../../Util/Factory/rowDataModelFactory";
import { Password } from "../../../Business/Model/MysqlModels/password";
import { passwordCrudInterface } from "../../interface/passwordCrudInterface";

/**
 * @author Dannique Klaver
 * @description This class is responsible for getting the password data from the database.
 * @methods getPasswordsByEmail() retrieves all private vehicles of a user by their email.
 */
export class PasswordSequelizeMysql implements passwordCrudInterface {
	/**
	 * Get all passwords associated with an email.
	 * @param {string} email - The email to search for.
	 * @returns {Promise<Password[] | null>} Returns a promise that resolves to an array of Password objects if passwords are found for the email, or null if no passwords are found.
	 */
	async getPasswordsByEmail(email: string): Promise<Password[]> {
		let returnValue: Password[] = [];

		// Get all passwords associated with an email.
		const passwords = await PasswordSequelize.findAll({
			where: {
				email: email,
			},
		});
		if (passwords && passwords.length > 0) {
			returnValue = convertRowDataToModels<Password>(
				passwords,
				["registerDate", "email", "hashedPassword", "expiryDate"],
				Password
			);
		} else {
			returnValue = [];
		}
		return returnValue;
	}
}
