import { passwordCrudInterface } from "../../../Data/interface/passwordCrudInterface";
import { Password } from "../../Model/MysqlModels/password";

export class PasswordQueryService {
	public constructor(private crudInterface: passwordCrudInterface) {}

	/**
	 * @author Dannique Klaver
	 * @description This method retrieves the user's hashed passwords from the database.
	 *
	 * @param {string} email - The user's email address.
	 * @returns {Promise<password[]>} - A promise that resolves with the user's hashed passwords.
	 *
	 */
	getPasswordsByEmail(email: string): Promise<Password[]> {
		return this.crudInterface.getPasswordsByEmail(email);
	}
}
