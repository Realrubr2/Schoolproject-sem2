import { Password } from "../../Business/Model/MysqlModels/password";
import { RegisterData } from "../../Business/Model/MysqlModels/registerData";

/**
 * Represents a CRUD interface for signing up users.
 * @interface signUpCrudInterface
 * @export signUpCrudInterface'
 *
 * @method getDepartment() Fetches all departments from the database.
 * @method checkIfUserExists() Checks if a user exists by checking for the email input in the database.
 * @method createUser() Creates a new user with the specified details.
 * @method createPassword() Creates a new password with the specified details.
 */
export interface signUpCrudInterface {
	checkIfUserExists(email: string): Promise<boolean>;
	createUser(registerData: RegisterData): Promise<boolean>;
	createPassword(passwordData: Password): Promise<boolean>;
}
