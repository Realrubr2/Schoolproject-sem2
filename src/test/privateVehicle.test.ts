/**
 * @author Dax Riool
 */
import { PrivateVehicleSequelizeMysql } from "../Data/models/privateVehicles/privateVehiclesSequelize";
import * as tssinon from "ts-sinon";
import { expect } from "chai";
import request from "supertest";
import { app } from "../server";
import sinon from "sinon";
import { PrivateVehicle } from "../Business/Model/MysqlModels/privateVehicle";
import { PrivateVehicleService } from "../Business/Service/privateVehicleService";
import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { sequelize } from "../Util/sequelizeDatabase";
import { PrivateVehicleMysql } from "../Data/models/privateVehicles/privateVehicleMysql";
import DepartmentSequelize from "../Business/Model/SequelizeModels/department";
import UserSequelize from "../Business/Model/SequelizeModels/user";
import PasswordSequelize from "../Business/Model/SequelizeModels/password";
import SessionSequelizeModel from "../Business/Model/SequelizeModels/session";
import VehicleTypeSequelize from "../Business/Model/SequelizeModels/vehicletype";
import PrivateVehicleSequelize from "../Business/Model/SequelizeModels/privateVehicle";
const sandbox = tssinon.default.createSandbox();

/**
 * @constant fakePrivateVehicle this is a fake privateVehicle object
 * @constant sandbox this is the enviroment where the sinon objects will Live
 * @constant sandbox.replace this is the method that will replace the original method with the stubbed method
 */
describe("PrivateVehicle Tests", () => {
	const fakePrivateVehicle = [
		new PrivateVehicle("ramon@fmail", "auto", "diesel"),
		new PrivateVehicle("ramon@fmail", "auto", "100% Elektrisch"),
	];

	// get the privateVehicleSequelizeMysql object that will be used for testing
	const privateVehicleSequelizeMysql = new PrivateVehicleSequelizeMysql();
	const userBySessionService = new UserBySessionService();
	const privateVehicleService = new PrivateVehicleService(
		privateVehicleSequelizeMysql,
		userBySessionService
	);
	/**
	 * @function beforeEach this function will run before each test
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
		await Promise.resolve(
			SessionSequelizeModel.create<SessionSequelizeModel>({
				sessionId: "64735567-4963-4472-9e83-31dd4c4cb414",
				email: "testUser1@jordit.com",
				expiryDate: new Date(Date.now() + 36000000),
			})
		);
		await Promise.resolve(
			VehicleTypeSequelize.bulkCreate<VehicleTypeSequelize>([
				{
					vehicleType: "auto",
					fuelType: "diesel",
					gcorkm: 100,
				},
				{
					vehicleType: "auto",
					fuelType: "100% Elektrisch",
					gcorkm: 0,
				},
			])
		);

		await Promise.resolve(
			PrivateVehicleSequelize.create<PrivateVehicleSequelize>({
				email: "testUser1@jordit.com",
				vehicleType: "auto",
				fuelType: "diesel",
			})
		);
	});

	/**
   * @function afterEach
   * this function will run after each test
  *@const tssinon.default.restore
  @const sandbox.restore
  this will restore the stub object
  * and the spy object
  * so that the application can run as normal
  * if not there is a risk that the application will return the things that are stubbed
  */
	afterEach(() => {
		sandbox.restore();
		tssinon.default.restore();
	});

	it("should return a list of private vehicles for a given user ( Integration )", async () => {
		// Arrange
		// Replace the method that interacts with the database with a stub function

		sandbox
			.stub(
				PrivateVehicleSequelizeMysql.prototype,
				"getAllPrivateVehiclesOfUserByEmail"
			)
			.returns(Promise.resolve(fakePrivateVehicle));

		sandbox
			.stub(PrivateVehicleMysql.prototype, "getAllPrivateVehiclesOfUserByEmail")
			.returns(Promise.resolve(fakePrivateVehicle));

		sandbox
			.stub(UserBySessionService.prototype, "getUserEmailBySession")
			.returns(Promise.resolve("ramon@fmail"));

		// Make a GET request to the /privateVehicles endpoint
		const response = await request(app)
			.get("/users/privatevehicles")
			.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");

		// Check that the response status is 200 (OK)
		expect(response.status).to.equal(202);
		// Check that the response body is the expected private vehicles
		expect(response.body).to.deep.equal(fakePrivateVehicle);
	});

	it("should give an error when a vehicle that you want to add already exists ( Integration )", async () => {
		const req: any = {
			body: {
				vehicleType: "auto",
				fuelType: "diesel",
			},
			cookies: {
				sessionId: "123",
			},
		};

		sandbox
			.stub(UserBySessionService.prototype, "getUserEmailBySession")
			.returns(Promise.resolve("ramon@fmail"));

		sandbox
			.stub(
				PrivateVehicleSequelizeMysql.prototype,
				"getAllPrivateVehiclesOfUserByEmail"
			)
			.returns(Promise.resolve(fakePrivateVehicle));

		sandbox
			.stub(PrivateVehicleMysql.prototype, "getAllPrivateVehiclesOfUserByEmail")
			.returns(Promise.resolve(fakePrivateVehicle));

		try {
			await privateVehicleService.createPrivateVehicle(req);
		} catch (error: any) {
			expect(error.message).to.equal("Dit voertuig bestaat al");
		}
	});

	it("should delete a private vehicle and return a success message ( Integration )", async () => {
		const reqBody = {
			vehicleType: "auto",
			fuelType: "diesel",
		};

		const spy = sinon.spy(
			PrivateVehicleService.prototype,
			"deletePrivateVehicle"
		);

		sandbox
			.stub(UserBySessionService.prototype, "getUserEmailBySession")
			.returns(Promise.resolve("ramon@fmail"));

		sandbox
			.stub(
				PrivateVehicleSequelizeMysql.prototype,
				"getAllPrivateVehiclesOfUserByEmail"
			)
			.returns(
				Promise.resolve([new PrivateVehicle("ramon@fmail", "auto", "diesel")])
			);

		sandbox
			.stub(PrivateVehicleMysql.prototype, "getAllPrivateVehiclesOfUserByEmail")
			.returns(
				Promise.resolve([new PrivateVehicle("ramon@fmail", "auto", "diesel")])
			);

		sandbox
			.stub(PrivateVehicleSequelizeMysql.prototype, "deletePrivateVehicle")
			.returns(Promise.resolve("Vehicle deleted"));

		sandbox
			.stub(PrivateVehicleMysql.prototype, "deletePrivateVehicle")
			.returns(Promise.resolve("Vehicle deleted"));

		const response = await request(app)
			.post("/users/delete/privatevehicle")
			.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414")
			.send(reqBody); // Send the request body

		expect(response.body).to.equal("Vehicle deleted");
		expect(response.statusCode).to.equal(202);
		expect(spy.called).to.be.true;
	});

	it("should give an error when a vehicle does not exist ( unit )", async () => {
		const req: any = {
			body: {
				vehicleType: "auto",
				fuelType: "diesel",
			},
			cookies: {
				sessionId: "123",
			},
		};

		sandbox
			.stub(UserBySessionService.prototype, "getUserEmailBySession")
			.returns(Promise.resolve("ramon@fmail"));

		sandbox
			.stub(
				PrivateVehicleSequelizeMysql.prototype,
				"getAllPrivateVehiclesOfUserByEmail"
			)
			.returns(Promise.resolve([]));

		sandbox
			.stub(PrivateVehicleMysql.prototype, "getAllPrivateVehiclesOfUserByEmail")
			.returns(Promise.resolve([]));

		try {
			await privateVehicleService.deletePrivateVehicle(req);
		} catch (error: any) {
			expect(error.message).to.equal("Dit voertuig bestaat niet");
		}
	});

	it("should return a array of private vehicles for a given user (E2E)", async () => {
		const spy = sinon.spy(
			PrivateVehicleService.prototype,
			"getAllPrivateVehiclesOfUserByEmail"
		);

		const response = await request(app)
			.get("/users/privatevehicles")
			.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");

		expect(response.statusCode).to.equal(202);
		expect(spy.called).to.be.true;
	});

	it("should create a private vehicle (E2E)", async () => {
		const body: any = {
			"vehicleType": "auto",
			"fuelType": "100% Elektrisch",
		};

		const spy = sinon.spy(
			PrivateVehicleService.prototype,
			"createPrivateVehicle"
		);

		const response = await request(app)
			.post("/users/add/privatevehicle")
			.send(body)
			.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");
		expect(response.statusCode).to.equal(202);
		expect(spy.called).to.be.true;
	});

	it("should delete a private vehicle (E2E)", async () => {
		const body: any = {
			"vehicleType": "auto",
			"fuelType": "diesel",
		};

		const spy = sinon.spy(
			PrivateVehicleService.prototype,
			"deletePrivateVehicle"
		);

		const response = await request(app)
			.post("/users/delete/privatevehicle")
			.send(body)
			.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");
		expect(response.statusCode).to.equal(202);
		expect(spy.called).to.be.true;
	});
});
