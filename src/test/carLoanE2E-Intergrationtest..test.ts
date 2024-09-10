import { expect } from "chai";
import { app } from "../server";
import request from "supertest";
import BusinessVehicleSequelize from "../Business/Model/SequelizeModels/businessVehicle";
import { sequelize } from "../Util/sequelizeDatabase";
import SessionSequelizeModel from "../Business/Model/SequelizeModels/session";
import { UserBySessionService } from "../Business/Service/UserBySessionService";
import { CarLoanSequelizeMysql } from "../Data/models/carLoan/carLoanSequelize";
import { CarLoanMysql } from "../Data/models/carLoan/carLoanMysql";
import { CarLoan } from "../Business/Model/MysqlModels/carLoan";
import sinon from "sinon";
import { BusinessVehicle } from "../Business/Model/MysqlModels/businessVehicle";
import VehicleTypeSequelize from "../Business/Model/SequelizeModels/vehicletype";
import DepartmentSequelize from "../Business/Model/SequelizeModels/department";
import UserSequelize from "../Business/Model/SequelizeModels/user";
import CarLoanSequelize from "../Business/Model/SequelizeModels/carLoan";

/**
 * @author Storm Verwer
 */
describe("getCarsAvailableBetweenDates and createCarLoan (END TO END)", () => {
	before(async () => {
		console.log("before");
		await sequelize.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
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
		});

		await DepartmentSequelize.create<DepartmentSequelize>({ department: "IT" });

		await UserSequelize.create<UserSequelize>({
			email: "testUser1@jordit.com",
			department: "IT",
			role: "gebruiker",
		});

		await UserSequelize.create<UserSequelize>({
			email: "testUser2@jordit.com",
			department: "IT",
			role: "gebruiker",
		});

		await Promise.all([
			VehicleTypeSequelize.create<VehicleTypeSequelize>({
				vehicleType: "Auto",
				fuelType: "diesel",
				gcorkm: 154,
			}),
			VehicleTypeSequelize.create<VehicleTypeSequelize>({
				vehicleType: "Auto",
				fuelType: "benzine",
				gcorkm: 154,
			}),
		]);

		await Promise.all([
			BusinessVehicleSequelize.create<BusinessVehicleSequelize>({
				licensePlate: "AB-12-CD",
				vehicleType: "Auto",
				fuelType: "diesel",
			}),
			BusinessVehicleSequelize.create<BusinessVehicleSequelize>({
				licensePlate: "AB-13-CD",
				vehicleType: "Auto",
				fuelType: "benzine",
			}),
		]);

		await CarLoanSequelize.create<CarLoanSequelize>({
			email: "testUser2@jordit.com",
			licensePlate: "AB-12-CD",
			startDate: new Date("2030-10-15"),
			endDate: new Date("2030-10-20"),
		});

		const sessionId = "64735567-4963-4472-9e83-31dd4c4cb414";

		await SessionSequelizeModel.create<SessionSequelizeModel>({
			sessionId: sessionId,
			email: "testUser1@jordit.com",
			expiryDate: new Date(Date.now() + 36000000),
		});
	});

	describe("end to end test", () => {
		beforeEach(() => {});
		it("should return 200 and car if the request is accepted getCarsAvailableBetweenDates E2E", async () => {
			const response = await request(app)
				.get("/cars/2030-10-15/2030-10-20/")
				.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");
			expect(response.statusCode).to.equal(200);
			expect(response.body).to.deep.equal([
				{ licensePlate: "AB-13-CD", vehicleType: "Auto", fuelType: "benzine" },
			]);
		});
		it("should return 400 if getCarsAvailableBetweenDates meets the validateservice layer and throws an error E2E", async () => {
			const response = await request(app)
				// wrong date
				.get("/cars/2020-10-15/2025-10-20/diesel")
				.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");
			expect(response.statusCode).to.equal(400);
		});
		it("should return 201 and a created carloan if the request is accepted for createCarLoan E2E", async () => {
			const response = await request(app)
				.post("/cars/loan/")
				.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414")
				.send({
					licensePlate: "AB-13-CD",
					startDate: "2030-01-01",
					endDate: "2030-01-31",
				});
			expect(response.status).equal(201);
			expect(response.body).to.deep.equal({
				email: "testUser1@jordit.com",
				licensePlate: "AB-13-CD",
				startDate: "2030-01-01",
				endDate: "2030-01-31",
			});
		});

		it("should return 400 if nothing is send in the body for createCarLoan E2E", async () => {
			const response = await request(app)
				.post("/cars/loan/")
				.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");
			expect(response.status).equal(400);
		});
	});
});
/////////////////////////////////////////////////////////////////////////////////////
describe("CarLoanControllerTest getCarsAvailableBetweenDates (INTERGRATION)", () => {
	let sandbox: sinon.SinonSandbox;

	beforeEach(() => {
		// Create a new sandbox before each test
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		// Restore all stubs and spies after each test
		sandbox.restore();
	});

	it("should return 400 if getCarsAvailableBetweenDates throws an error", async () => {
		const expectedError = new Error("Test error");
		sandbox
			.stub(CarLoanSequelizeMysql.prototype, "getCarsAvailableBetweenDates")
			.throws(expectedError);
		sandbox
			.stub(CarLoanMysql.prototype, "getCarsAvailableBetweenDates")
			.throws(expectedError);
		try {
			let response = await request(app)
				.get("/cars/2025-10-15/2025-10-20/diesel")
				.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");
			expect(response.statusCode).equals(400);
		} catch (error: any) {
			expect(error.message).to.equal(expectedError.message);
		}
	});

	it("should return 200 and a businessvechicle if the request is accepted for getCarsAvailableBetweenDates", async () => {
		const businessVehicle = [new BusinessVehicle("AB-12-CD", "diesel", "auto")];

		sandbox
			.stub(CarLoanSequelizeMysql.prototype, "getCarsAvailableBetweenDates")
			.returns(Promise.resolve(businessVehicle));
		sandbox
			.stub(CarLoanMysql.prototype, "getCarsAvailableBetweenDates")
			.returns(Promise.resolve(businessVehicle));

		let response = await request(app)
			.get("/cars/2030-10-15/2030-10-20/diesel")
			.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414");
		expect(response.body).to.deep.equal(businessVehicle);
		expect(response.statusCode).equals(200);
	});

	describe("CarLoanControllerTest createCarLoan (INTERGRATION)", () => {
		it("should return 401 and no session found, if no session was found for createCarLoan", async () => {
			try {
				let response = await request(app).post("/cars/loan/");
				expect(response.statusCode).equals(401);
				expect(response.body).to.deep.equal({ message: "No session found" });
			} catch (error) {
				console.error(error);
			}
		});

		it("should return 201 and a created carloan if the request is accepted for createCarLoan", async () => {
			const userEmail = "danique.klaver@jordit.com";
			const carLoan = new CarLoan(
				"AB-13-CD",
				userEmail,
				new Date("2030-01-01"),
				new Date("2030-01-31")
			);

			// Stub the methods before making the request
			sandbox
				.stub(UserBySessionService.prototype, "getUserEmailBySession")
				.returns(Promise.resolve(userEmail));

			sandbox
				.stub(CarLoanSequelizeMysql.prototype, "createCarloan")
				.returns(Promise.resolve(carLoan));
			sandbox
				.stub(CarLoanMysql.prototype, "createCarloan")
				.returns(Promise.resolve(carLoan));

			try {
				let response = await request(app)
					.post("/cars/loan/")
					.send(carLoan)
					.set("Cookie", [`sessionId="64735567-4963-4472-9e83-31dd4c4cb414"`]);
				expect(response.statusCode).equals(201);
				expect(response.body).to.deep.equal(carLoan);
			} catch (error) {
				console.error(error);
			}
		});
		it("should return 400 if nothing is send in the body for createCarLoan", async () => {
			sandbox
				.stub(UserBySessionService.prototype, "getUserEmailBySession")
				.returns(Promise.resolve("danique.klaver@jordit.com"));

			sandbox.stub(CarLoanSequelizeMysql.prototype, "createCarloan");
			sandbox.stub(CarLoanMysql.prototype, "createCarloan");
			try {
				let response = await request(app).post("/cars/loan/");
				expect(response.statusCode).equals(400);
			} catch (error) {}
		});
	});

	after(async () => {
		await CarLoanSequelize.destroy({
			where: { licensePlate: ["AB-12-CD", "AB-13-CD"] },
		});
		await BusinessVehicleSequelize.destroy({
			where: { licensePlate: ["AB-12-CD", "AB-13-CD"] },
		});
		await VehicleTypeSequelize.destroy({ where: { vehicleType: "Auto" } });
		await SessionSequelizeModel.destroy({
			where: { sessionId: "64735567-4963-4472-9e83-31dd4c4cb414" },
		});
		await UserSequelize.destroy({
			where: { email: ["testUser1@jordit.com", "testUser2@jordit.com"] },
		});
		await DepartmentSequelize.destroy({ where: { department: "IT" } });
		sequelize.close();
	});
});
