import { userCrudInterface } from "../../Data/interface/userCrudInterface";
import { User } from "../Model/MysqlModels/user";
import { UserBySessionService } from "./UserBySessionService";
import { Request, Response } from "express";

export class UserService {
	public constructor(private crudinterface: userCrudInterface) {}
	getAllUsers() {
		// Get all users from the database
		return this.crudinterface.getAllUsers();
	}
	async getUserByEmail(req: Request): Promise<User | undefined> {
		// Get user by email from the database
		const userBySessionService = new UserBySessionService();
		const sessionId = req.cookies.sessionId;

		const email = await userBySessionService.getUserEmailBySession(sessionId);
		if (email !== null) {
			return this.crudinterface.getUserByEmail(email);
		}
		throw new Error("no session found");
	}

	loginUser(email: string) {
		return this.crudinterface.getUserByEmail(email);
	}

	createUser(email: string) {
		return this.crudinterface.createUser(email);
	}
}
