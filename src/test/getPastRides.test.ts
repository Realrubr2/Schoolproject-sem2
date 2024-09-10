import * as tssinon from "ts-sinon";
import { expect } from "chai";
import request from "supertest";
import { app } from "../server";
import { TravelMysql } from "../Data/models/travel/travelMysql";
import { TravelSequelizeMysql } from "../Data/models/travel/travelSequelize";
import { Travel } from "../Business/Model/MysqlModels/travel";
import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { sequelize } from "../Util/sequelizeDatabase";
import TravelSequelize from "../Business/Model/SequelizeModels/travel";
import UserSequelize from "../Business/Model/SequelizeModels/user";
import PasswordSequelize from "../Business/Model/SequelizeModels/password";
import SessionSequelizeModel from "../Business/Model/SequelizeModels/session";
import DepartmentSequelize from "../Business/Model/SequelizeModels/department";
/**
 * @author Ramon iro-omo
 */
describe("getPastRides [end to end] test", () => {
	/**
	 * create a sandbox
	 */
	let sandbox = tssinon.default.createSandbox();

	/**
	 * @author Ramon iro-omo
	 * Here we sync the sequilize database with the test db and this will drop all tables and create new ones,
	 *  by first ignoring the foreign key restraints and syncing and then setting foreing key restraints back again.
	 * I couldn not put this in its own document because it will give async problems. meaning even if it is put in before all using
	 * mocha hooks. it will not compllete fast enough. so yes its ugly but is works!
	 *
	 */
	before(async () => {
		// syncing the DB
		await Promise.resolve(
			sequelize.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
				return sequelize.sync({ force: true, match: /test$/ }).then(() => {
					return sequelize.query("SET FOREIGN_KEY_CHECKS = 1").then(
						() => {
							console.log("test db gemaak");
						},
						(error) => {
							console.log(error);
						}
					);
				});
			})
		);
		// creating a department
		await Promise.resolve(
			DepartmentSequelize.create<DepartmentSequelize>({ department: "IT" })
		);
		// creating a user
		await Promise.resolve(
			UserSequelize.create<UserSequelize>({
				email: "testUser1@jordit.com",
				department: "IT",
				role: "gebruiker",
			})
		);
		// creating a password
		await Promise.resolve(
			PasswordSequelize.create<PasswordSequelize>({
				registerDate: new Date(Date.now()),
				email: "testUser1@jordit.com",
				hashedPassword:
					"$argon2id$v=19$m=65536,t=3,p=4$y+ctrjRwfVBqDZfIrcOSYQ$U090+JAFrgLJUSFJjjnGvTDMheVg7TGH5vZjQ0RaqMo",
				expiryDate: new Date(Date.now() + 36000000),
			})
		);
		// creating a session
		const sessionId = "64735567-4963-4472-9e83-31dd4c4cb414";

		// Create the session in the database
		await SessionSequelizeModel.create<SessionSequelizeModel>({
			sessionId: sessionId,
			email: "testUser1@jordit.com",
			expiryDate: new Date(Date.now() + 36000000),
		});
		//creating a travel
		await Promise.resolve(
			TravelSequelize.create<TravelSequelize>({
				dateTime: new Date(Date.now()),
				email: "testUser1@jordit.com",
				travelDate: new Date(Date.now()),
				locationFrom: "amsterdam",
				locationTo: "belgie",
				gco: 100,
				travelType: "woon-werk",
			})
		);
	});

	beforeEach(() => {});
	afterEach(() => {
		sandbox.restore();
	});

	/**
	 * All the end to end tests contain no stubs and make real requests to the database!
	 * if these values are not present they will fail! this is wrong and there should be a mock databse
	 * but simply creating a stub and returning a mock does not give the results you want to expect form an end 2 end
	 */
	it("verzoek met lege sessie sturen,", async () => {
		let response = await request(app)
			.get("/getpastrides")
			.set("Cookie", "sessionId=")
			.send({});
		expect(response.statusCode).equals(401);
	});
	it("controleren of de backend een 202 terug stuurt", async () => {
		const response = await request(app)
			.get("/getpastrides")

			.set("Cookie", [`sessionId=64735567-4963-4472-9e83-31dd4c4cb414`])

			.send({});
		console.log("22");
		expect(response.statusCode).equals(202);
	});

	describe("getPastRides [integration test]", () => {
		let sandbox = tssinon.default.createSandbox();
		beforeEach(() => {});
		afterEach(() => {
			sandbox.restore();
		});
		/**
		 * here we test if the user does not have an session id what kind of response we get
		 */
		it("controleren of de backend een 404 terug stuurt", async () => {
			sandbox.replace(
				UserBySessionService.prototype,
				"getUserEmailBySession",
				async () => {
					return Promise.resolve(null);
				}
			);

			const response = await request(app)
				.get("/getpastrides")
				.set("Cookie", [`sessionId=64735567-4963-4472-9e83-31dd4c4cb414`])
				.send({});
			expect(response.statusCode).equals(404);
		});
		/**
       it gets the actual user email from the databse but we 
       * stub the return of the past rides to be null to simulate there not being any travels inside the DB
       */
		it("controleren of de Data word terug gestuurd", async () => {
			sandbox.replace(TravelMysql.prototype, "getPastRides", async () => {
				return Promise.resolve(null);
			});
			sandbox.replace(
				TravelSequelizeMysql.prototype,
				"getPastRides",
				async () => {
					return Promise.resolve(null);
				}
			);

			const response = await request(app)
				.get("/getpastrides")
				.set("Cookie", [`sessionId=64735567-4963-4472-9e83-31dd4c4cb414`])
				.send({});
			expect(response.statusCode).equals(204);
		});

		/**
		 * here we send a request where the response has a lot of rides
		 */
		it("verzoek met heel erg veel ritten", async () => {
			const travelArr: Travel[] = [];
			for (let i = 0; i < 40; i++) {
				const travel: Travel = {
					dateTime: new Date(Date.now() + i),
					from: "street1",
					to: "street2",
					email: "email1",
					travelDate: "traveldateString",
					gco: 500,
					travelType: "car",
				};
				travelArr.push(travel);
			}

			sandbox.replace(
				UserBySessionService.prototype,
				"getUserEmailBySession",
				async () => {
					return Promise.resolve("email1");
				}
			);

			sandbox.replace(TravelMysql.prototype, "getPastRides", async () => {
				return Promise.resolve(travelArr);
			});
			sandbox.replace(
				TravelSequelizeMysql.prototype,
				"getPastRides",
				async () => {
					return Promise.resolve(travelArr);
				}
			);

			const response = await request(app)
				.get("/getpastrides")
				.set("Cookie", [`sessionId=64735567-4963-4472-9e83-31dd4c4cb414`])
				.send({});
			expect(response.statusCode).equals(202);
		});
	});

	after(async () => {
		sequelize.close();
	});
});
