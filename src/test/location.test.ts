import { LocationSequelizeMysql } from "../Data/models/locations/locationSequelize";
import * as tssinon from "ts-sinon";
import { expect } from "chai";
import request from "supertest";
import { app } from "../server";
import { Location } from "../Business/Model/MysqlModels/location";

const sandbox = tssinon.default.createSandbox();

const fakeLocation: Location[] = [
	{
		location: "Amsterdam",
		email: "test@jordit.com",
	},
];
/**
 * @constant fakeLocation this is a fake location object
 * @constant sandbox this is the enviroment where the sinon objects will Live
 * @constant sandbox.replace this is the method that will replace the original method with the stubbed method
 */
describe("Locationcontrollertest", () => {
	/**
	 * @function beforeEach this function will run before each test
	 */
	beforeEach(() => {});

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
});
