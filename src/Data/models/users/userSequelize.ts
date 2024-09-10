import { User } from "../../../Business/Model/MysqlModels/user";
import UserSequelize from "../../../Business/Model/SequelizeModels/user";
import { userCrudInterface } from "../../interface/userCrudInterface";

export class UserSequelizeMysql implements userCrudInterface {
	async createUser(name: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async getAllUsers(): Promise<void | User[]> {
		const result: UserSequelize[] | null = await UserSequelize.findAll();
		if (result === null) {
			throw new Error("No user found");
		} else {
			return result.map(
				(user) => new User(user.email, user.department, user.role)
			);
		}
	}

	async updateUser(id: number, name: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async deleteUser(id: number): Promise<void> {
		await UserSequelize.destroy({ where: { id } });
	}

	async getUserByEmail(email: string): Promise<User | undefined> {
		const user = await UserSequelize.findOne({ where: { email } });
		if (user === null) {
			return undefined;
		}
		return new User(user.email, user.department, user.role);
	}

	convertRowdataToUser(rowDataPacket: any): User[] {
		const users: User[] = [];
		rowDataPacket.forEach((element: any) => {
			users.push({
				email: element.dataValues.email,
				department: element.dataValues.department,
				role: element.dataValues.role,
			});
		});
		return users;
	}
}
