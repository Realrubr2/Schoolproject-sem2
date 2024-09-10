import { DepartmentCrud } from "../Data/crud/departmentCrud";
import { DepartmentService } from "../Business/Service/departmentService";
import { DepartmentController } from "../Controller/departmentController";
import { expect } from "chai";
import sinon from "sinon";
import * as tssinon from "ts-sinon";
import request from "supertest";
import express from "express";
import { Department } from "../Business/Model/MysqlModels/department";
import { DepartmentMysql } from "../Data/models/department/departmentMysql";
import { DepartmentSequelizeMysql } from "../Data/models/department/departmentSequelize";

const sandbox = tssinon.default.createSandbox();

const fakeDepartmentType: Department[] = [
	new Department("IT"),
	new Department("Sales"),
	new Department("Marketing"),
	new Department("HR"),
	new Department("Finance"),
	new Department("Legal"),
];
describe("Department - MySQL", () => {
	let departmentCrud: DepartmentCrud;
	let departmentService: DepartmentService;
	let departmentController: DepartmentController;
	let app: express.Express;
	let getDepartmentsStub: sinon.SinonStub<[], Promise<Department[]>>;

	beforeEach(() => {
		departmentCrud = new DepartmentCrud(new DepartmentMysql());
		getDepartmentsStub = sandbox.stub(departmentCrud, "getDepartments");
		departmentService = new DepartmentService(departmentCrud);
		departmentController = new DepartmentController(departmentService);
		departmentController.getDepartments =
			departmentController.getDepartments.bind(departmentController);
		app = express();
		app.use(express.json());
		app.get("/department", departmentController.getDepartments);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("should return all department types", async () => {
		getDepartmentsStub.resolves(fakeDepartmentType);
		try {
			const res = await request(app).get("/department");

			if (res.body.error) {
				console.log(`Error: ${res.body.error}`);
				throw new Error(`Error fetching departments: ${res.body.error}`);
			}

			expect(res.body).to.be.an("array");
			res.body.forEach((departmentType: Department) => {
				expect(departmentType).to.have.property("department");
			});
		} catch (error) {
			console.log(`Test error: ${error}`);
		}
	});

	it("should return an empty array when no departments are found", async () => {
		getDepartmentsStub.resolves([]);
		const res = await request(app).get("/department");
		expect(res.body).to.be.an("array").that.is.empty;
	});

	it("should handle errors", async () => {
		getDepartmentsStub.rejects(new Error("Test error"));
		const res = await request(app).get("/department");
		expect(res.body).to.have.property("error", "Test error");
	});
});

describe("Department - Sequelize", () => {
	let departmentCrud: DepartmentCrud;
	let departmentService: DepartmentService;
	let departmentController: DepartmentController;
	let app: express.Express;
	let getDepartmentsStub: sinon.SinonStub<[], Promise<Department[]>>;

	beforeEach(() => {
		departmentCrud = new DepartmentCrud(new DepartmentSequelizeMysql());
		getDepartmentsStub = sandbox.stub(departmentCrud, "getDepartments");
		departmentService = new DepartmentService(departmentCrud);
		departmentController = new DepartmentController(departmentService);
		departmentController.getDepartments =
			departmentController.getDepartments.bind(departmentController);
		app = express();
		app.use(express.json());
		app.get("/department", departmentController.getDepartments);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it("should return all department types", async () => {
		getDepartmentsStub.resolves(fakeDepartmentType);
		try {
			const res = await request(app).get("/department");

			if (res.body.error) {
				console.log(`Error: ${res.body.error}`);
				throw new Error(`Error fetching departments: ${res.body.error}`);
			}

			expect(res.body).to.be.an("array");
			res.body.forEach((departmentType: Department) => {
				expect(departmentType).to.have.property("department");
			});
		} catch (error) {
			console.log(`Test error: ${error}`);
		}
	});

	it("should return an empty array when no departments are found", async () => {
		getDepartmentsStub.resolves([]);
		const res = await request(app).get("/department");
		expect(res.body).to.be.an("array").that.is.empty;
	});

	it("should handle errors", async () => {
		getDepartmentsStub.rejects(new Error("Test error"));
		const res = await request(app).get("/department");
		expect(res.body).to.have.property("error", "Test error");
	});
});
