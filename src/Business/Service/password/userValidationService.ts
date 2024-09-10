import { Password } from "../../Model/MysqlModels/password";

export class UserValidationService {
	/**
	 * @author Dannique Klaver
	 * @description This method validates the user's registration.
	 *
	 * @param {Array} passwordDataArray - An array of password data objects.
	 * @param {express.Response} res - the status code and error message to send to the client.
	 */
	validateUserRegistration(passwordDataArray: Password[], res: any) {
		// check if passwordDataArray is null or empty, if so, return an error.
		if (!passwordDataArray || passwordDataArray.length === 0) {
			throw new Error("User is not registered");
		}
		// if passwordDataArray is not null or empty, return true.
	}
}
