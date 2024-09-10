import * as sinon from "sinon";
import { assert } from "chai";
import { CarLoanService } from "../Business/Service/carLoan/carLoanService";
import { CarLoanSearch } from "../Business/Model/MysqlModels/carLoanSearch";
import { BusinessVehicle } from "../Business/Model/MysqlModels/businessVehicle";

/**
 * @author Storm Verwer
 */

describe("CarLoanServiceTest getCarsAvailableBetweenDates (UNIT)", () => {
	let instance: CarLoanService;
	let crudInterfaceStub: any;

	beforeEach(() => {
		crudInterfaceStub = { getCarsAvailableBetweenDates: sinon.stub() };
		instance = new CarLoanService(crudInterfaceStub);
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should throw an error if start date is after end date (unit getCarsAvailableBetweenDates)", async () => {
		const searchData = new CarLoanSearch(
			new Date("2030-05-15"),
			new Date("2030-05-10")
		);

		try {
			await instance.getCarsAvailableBetweenDates(searchData);
			assert.fail("Expected an error to be thrown");
		} catch (error) {
			assert.equal(
				(error as Error).message,
				"De van datum kan niet voor de tot datum zijn."
			);
		}
		sinon.assert.notCalled(crudInterfaceStub.getCarsAvailableBetweenDates);
	});

	it("should throw an error if start date is in the past (unit getCarsAvailableBetweenDates)", async () => {
		const searchData = new CarLoanSearch(
			new Date("2020-05-15"),
			new Date("2030-05-10")
		);

		try {
			await instance.getCarsAvailableBetweenDates(searchData);
			assert.fail("Expected an error to be thrown");
		} catch (error) {
			assert.equal(
				(error as Error).message,
				"De ingevoerde van datum is al verstreken."
			);
		}

		sinon.assert.notCalled(crudInterfaceStub.getCarsAvailableBetweenDates);
	});

	it("should throw an error if end date is before the from date (unit getCarsAvailableBetweenDates)", async () => {
		const searchData = new CarLoanSearch(
			new Date("2030-05-15"),
			new Date("2014-05-10")
		);

		try {
			await instance.getCarsAvailableBetweenDates(searchData);
			assert.fail("Expected an error to be thrown");
		} catch (error) {
			assert.equal(
				(error as Error).message,
				"De van datum kan niet voor de tot datum zijn."
			);
		}

		sinon.assert.notCalled(crudInterfaceStub.getCarsAvailableBetweenDates);
	});

	it("should throw an error if no cars are available (unit getCarsAvailableBetweenDates)", async () => {
		const searchData = new CarLoanSearch(
			new Date("2030-05-15"),
			new Date("2030-05-20")
		);
		crudInterfaceStub.getCarsAvailableBetweenDates.returns([]);

		try {
			await instance.getCarsAvailableBetweenDates(searchData);
			assert.fail("Expected an error to be thrown");
		} catch (error) {
			assert.equal(
				(error as Error).message,
				`Er zijn geen auto's beschikbaar die voldoen aan de zoekcriteria`
			);
		}

		sinon.assert.calledOnce(crudInterfaceStub.getCarsAvailableBetweenDates);
	});

	it("should return the business vehicles if cars are available", async () => {
		const searchData = new CarLoanSearch(
			new Date("2025-10-15"),
			new Date("2025-10-20")
		);
		const businessVehicle = [
			new BusinessVehicle("AB-12-CD", "auto", "benzine"),
		];
		crudInterfaceStub.getCarsAvailableBetweenDates.returns(businessVehicle);

		const result = await instance.getCarsAvailableBetweenDates(searchData);

		assert.deepEqual(result, businessVehicle);
		sinon.assert.calledOnce(crudInterfaceStub.getCarsAvailableBetweenDates);
	});
});
