import User from "../../Business/Model/SequelizeModels/user";
import { userCrudInterface } from "../interface/userCrudInterface";
import { UserMysql } from "../models/users/userMysql";
import { UserSequelizeMysql } from "../models/users/userSequelize";
/**
 * @author Ramon iro-omo
 * @description This class implements the CRUD operations for the user and checks for wich datalayer is used
 * and it makes sure theres only one instance of it
 */
export class UserCrud implements userCrudInterface {
	public constructor(private dataLayer: UserSequelizeMysql | UserMysql) {}

	async createUser(name: string): Promise<void> {
		// Create a new user in the database
	}
	async getAllUsers(): Promise<void | User[]> {
		return (await this.dataLayer.getAllUsers()) as unknown as User[];
		// Read a user from the database
	}
	async updateUser(id: number, name: string): Promise<void> {
		// Update a user in the database
	}
	async deleteUser(id: number): Promise<void> {
		// Delete a user from the database
	}
	async getUserByEmail(email: string): Promise<undefined | User> {
		return (await this.dataLayer.getUserByEmail(email)) as User;
		// Get a user by email from the database
	}
}
