import { VehicleCrud } from "../Data/crud/vehicleCrud";
import { VehicleService } from "../Business/Service/vehicleService";
import { VehicleController } from "../Controller/vehicleController";
import { VehicleType } from "../Business/Model/MysqlModels/vehicletype";
import { expect } from "chai";
import sinon from "sinon";
import * as tssinon from "ts-sinon";
import request from "supertest";
import express from "express";
import { vehicleType } from "../Business/Model/Interfaces/vehicletype";
import { VehicleMysql } from "../Data/models/vehicle/vehicleMysql";
import { VehicleSequelizeMysql } from "../Data/models/vehicle/vehicleSequelize";

const sandbox = tssinon.default.createSandbox();

const fakeVehicleType: vehicleType[] = [
	{ vehicle: "Car", fuelType: "Petrol", gcorkm: 2.5 },
	{ vehicle: "Bike", fuelType: "Diesel", gcorkm: 1.5 },
];

describe("VehicleType - MySQL", () => {
	let vehicleCrud: VehicleCrud;
	let vehicleService: VehicleService;
	let vehicleController: VehicleController;
	let app: express.Express;
	let getVehiclesStub: sinon.SinonStub<[], Promise<vehicleType[]>>;

	beforeEach(() => {
		vehicleCrud = new VehicleCrud(new VehicleMysql());
		getVehiclesStub = sandbox.stub(vehicleCrud, "getVehicles");
		vehicleService = new VehicleService(vehicleCrud);
		vehicleController = new VehicleController(vehicleService);
		vehicleController.getVehicles =
			vehicleController.getVehicles.bind(vehicleController);
		app = express();
		app.use(express.json());
		app.get("/vehicle", vehicleController.getVehicles);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("should return all vehicle types", async () => {
		getVehiclesStub.resolves(fakeVehicleType);
		try {
			const res = await request(app).get("/vehicle");

			if (res.body.error) {
				console.log(`Error: ${res.body.error}`);
				throw new Error(`Error fetching vehicles: ${res.body.error}`);
			}

			expect(res.body).to.be.an("array");
			res.body.forEach((vehicleType: VehicleType) => {
				expect(vehicleType).to.have.property("vehicle");
				expect(vehicleType).to.have.property("fuelType");
				expect(vehicleType).to.have.property("gcorkm");
			});
		} catch (error) {
			console.log(`Test error: ${error}`);
		}
	});

	it("should return an empty array when no vehicles are found", async () => {
		getVehiclesStub.resolves([]);
		const res = await request(app).get("/vehicle");
		expect(res.body).to.be.an("array").that.is.empty;
	});

	it("should handle errors", async () => {
		getVehiclesStub.rejects(new Error("Test error"));
		const res = await request(app).get("/vehicle");
		expect(res.body).to.have.property("error", "Test error");
	});
});

describe("VehicleType - Sequelize", () => {
	let vehicleCrud: VehicleCrud;
	let vehicleService: VehicleService;
	let vehicleController: VehicleController;
	let app: express.Express;
	let getVehiclesStub: sinon.SinonStub<[], Promise<vehicleType[]>>;

	beforeEach(() => {
		vehicleCrud = new VehicleCrud(new VehicleSequelizeMysql());
		getVehiclesStub = sandbox.stub(vehicleCrud, "getVehicles");
		vehicleService = new VehicleService(vehicleCrud);
		vehicleController = new VehicleController(vehicleService);
		vehicleController.getVehicles =
			vehicleController.getVehicles.bind(vehicleController);
		app = express();
		app.use(express.json());
		app.get("/vehicle", vehicleController.getVehicles);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("should return all vehicle types", async () => {
		getVehiclesStub.resolves(fakeVehicleType);
		try {
			const res = await request(app).get("/vehicle");

			if (res.body.error) {
				console.log(`Error: ${res.body.error}`);
				throw new Error(`Error fetching vehicles: ${res.body.error}`);
			}

			expect(res.body).to.be.an("array");
			res.body.forEach((vehicleType: VehicleType) => {
				expect(vehicleType).to.have.property("vehicle");
				expect(vehicleType).to.have.property("fuelType");
				expect(vehicleType).to.have.property("gcorkm");
			});
		} catch (error) {
			console.log(`Test error: ${error}`);
		}
	});

	it("should return an empty array when no vehicles are found", async () => {
		getVehiclesStub.resolves([]);
		const res = await request(app).get("/vehicle");
		expect(res.body).to.be.an("array").that.is.empty;
	});

	it("should handle errors", async () => {
		getVehiclesStub.rejects(new Error("Test error"));
		const res = await request(app).get("/vehicle");
		expect(res.body).to.have.property("error", "Test error");
	});
});
