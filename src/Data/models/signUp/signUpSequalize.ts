import UserSequelize from "../../../Business/Model/SequelizeModels/user";
import PasswordSequelize from "../../../Business/Model/SequelizeModels/password";
import { signUpCrudInterface } from "../../interface/signUpCrudInterface";
import { RegisterData } from "../../../Business/Model/MysqlModels/registerData";
import { Model } from "sequelize";
import { Password } from "../../../Business/Model/MysqlModels/password";

/**
 * Represents a class that provides methods for signing up users using Sequelize.
 * @author Britt Rood
 */
export class signUpSequalize implements signUpCrudInterface {
	/**
	 * Checks if a user exists by checking for the email input in the database.
	 * @param email - The email address of the user.
	 * @returns A promise that resolves to a boolean indicating if the user exists.s
	 */
	async checkIfUserExists(email: string): Promise<boolean> {
		const user = await UserSequelize.findOne({
			where: {
				email: email,
			},
		});
		return user !== null;
	}

	/**
	 * Creates a new user with the specified details.
	 * @param registerData - The registration data of the user.
	 * @returns A promise that resolves to a boolean indicating if the user was created successfully.
	 */
	async createUser(registerData: RegisterData): Promise<boolean> {
		const user = await UserSequelize.create<any>({
			email: registerData.getEmail(),
			department: registerData.getDepartment(),
			role: registerData.getRole(),
		});
		return user !== null;
	}

	/**
	 * Creates a new password with the specified details.
	 * @param passwordData - The password data of the user.
	 * @returns A promise that resolves to a boolean indicating if the password was created successfully.
	 */
	async createPassword(passwordData: Password): Promise<boolean> {
		const passwordModel = await PasswordSequelize.create<Model<any, any>>({
			registerDate: passwordData.getRegisterDate(),
			email: passwordData.getEmail(),
			hashedPassword: passwordData.getHashedPassword(),
			expiryDate: passwordData.getExpiryDate(),
		});
		return passwordModel !== null;
	}
}
