import { TravelController } from "../Controller/travelController";
import { expect } from "chai";
import sinon from "sinon";
import * as tssinon from "ts-sinon";
import request from "supertest";
import express from "express";
import { Dashboard } from "../Business/Model/MysqlModels/dashboard";
import { TravelServiceHandler } from "../Business/Service/travel/travelServiceHandler";
import { TravelDateValidationService } from "../Business/Service/travel/travelDateValidationService";
import { travelCrudInterface } from "../Data/interface/travelCrudInterface";
import { UserBySessionService } from "../Business/Service/UserBySessionService";

const sandbox = tssinon.default.createSandbox();

const dummyTrips: Dashboard[] = [
	{
		dateTime: "2022-01-01T00:00:00",
		department: "R&D",
		travelType: "woon-werk",
		vehicleType: "Auto",
		fuelType: "LPG",
		gcorkm: 149,
		km: 70,
		euro: 0,
		gco: 10430,
	},
	{
		dateTime: "2022-01-02T00:00:00",
		department: "IT",
		travelType: "zakelijk",
		vehicleType: "Auto",
		fuelType: "diesel",
		gcorkm: 154,
		km: 50,
		euro: 0,
		gco: 7700,
	},
];

describe("TravelController", () => {
	let travelCrudInterface: travelCrudInterface;
	let travelDateValidationService: TravelDateValidationService;
	let travelService: TravelServiceHandler;
	let travelController: TravelController;
	let userBySession: UserBySessionService;
	let app: express.Express;
	let getAllDashboardDataStub: sinon.SinonStub;
	let getFilteredDashboardDataStub: sinon.SinonStub;

	beforeEach(() => {
		travelService = new TravelServiceHandler(
			travelDateValidationService,
			travelCrudInterface,
			userBySession
		);
		getAllDashboardDataStub = sandbox.stub(
			travelService,
			"getAllDashboardData"
		);
		getFilteredDashboardDataStub = sandbox.stub(
			travelService,
			"getFilteredDashboardData"
		);
		travelController = new TravelController(travelService);
		app = express();
		app.use(express.json());
		app.get(
			"/dashboard",
			travelController.getDashboardData.bind(travelController)
		);
		app.get(
			"/dashboardBetweenDates/:start/:end",
			travelController.getDashboardDataBetweenDates.bind(travelController)
		);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("should return all dashboard data", async () => {
		getAllDashboardDataStub.resolves(dummyTrips);
		const res = await request(app).get("/dashboard");

		if (res.body.error) {
			console.log(`Error: ${res.body.error}`);
			throw new Error(`Error fetching dashboard data: ${res.body.error}`);
		}

		expect(res.body).to.be.an("array");
		res.body.forEach((trip: Dashboard) => {
			expect(trip).to.have.property("dateTime");
			expect(trip).to.have.property("department");
			expect(trip).to.have.property("travelType");
			expect(trip).to.have.property("vehicleType");
			expect(trip).to.have.property("fuelType");
			expect(trip).to.have.property("gcorkm");
			expect(trip).to.have.property("km");
			expect(trip).to.have.property("euro");
			expect(trip).to.have.property("gco");
		});
	});

	it("should return filtered dashboard data", async () => {
		const start = "2022-01-01";
		const end = "2022-01-31";
		getFilteredDashboardDataStub.resolves(dummyTrips);
		const res = await request(app).get(
			`/dashboardBetweenDates/${start}/${end}`
		);

		if (res.body.error) {
			console.log(`Error: ${res.body.error}`);
			throw new Error(
				`Error fetching filtered dashboard data: ${res.body.error}`
			);
		}

		expect(res.body).to.be.an("array");
		res.body.forEach((trip: Dashboard) => {
			expect(trip).to.have.property("dateTime");
			expect(trip).to.have.property("department");
			expect(trip).to.have.property("travelType");
			expect(trip).to.have.property("vehicleType");
			expect(trip).to.have.property("fuelType");
			expect(trip).to.have.property("gcorkm");
			expect(trip).to.have.property("km");
			expect(trip).to.have.property("euro");
			expect(trip).to.have.property("gco");
		});
	});

	it("should return an empty array when no dashboard data is found", async () => {
		getAllDashboardDataStub.resolves([]);
		const res = await request(app).get("/dashboard");
		expect(res.body).to.be.an("array").that.is.empty;
	});

	it("should handle errors", async () => {
		getAllDashboardDataStub.rejects(new Error("Test error"));
		const res = await request(app).get("/dashboard");
		expect(res.body).to.have.property("error", "Test error");
	});
});
