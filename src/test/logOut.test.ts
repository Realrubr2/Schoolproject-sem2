import * as tssinon from "ts-sinon";
import { expect } from "chai";
import request from "supertest";
import { app } from "../server";
import { SessionSequelize } from "../Data/models/session/sessionSequelize";
import { SessionMysql } from "../Data/models/session/sessionMysql";
import { Session } from "../Business/Model/MysqlModels/session";

describe("tests for logout", () => {
	let sandbox = tssinon.default.createSandbox();
	beforeEach(() => {});

	afterEach(() => {
		sandbox.restore();
	});

	it("should logout a person", async () => {
		sandbox.replace(SessionSequelize.prototype, "deleteSession", async () => {
			return Promise.resolve(true);
		});
		sandbox.replace(SessionMysql.prototype, "deleteSession", async () => {
			return Promise.resolve(true);
		});
		sandbox.replace(SessionMysql.prototype, "getSession", async () => {
			return Promise.resolve(
				new Session(
					"randomEmail@gmail",
					"sessionId=64735567-4963-4472-9e83-31dd4c4cb414",
					new Date(Date.now())
				)
			);
		});
		sandbox.replace(SessionSequelize.prototype, "getSession", async () => {
			return Promise.resolve(
				new Session(
					"randomEmail@gmail",
					"sessionId=64735567-4963-4472-9e83-31dd4c4cb414",
					new Date(Date.now())
				)
			);
		});
		let response = await request(app)
			.post("/logout")
			.set("Cookie", "sessionId=64735567-4963-4472-9e83-31dd4c4cb414")
			.send({});
		expect(response.statusCode).equals(202);
		expect(JSON.stringify(response.body)).equals(
			JSON.stringify({ redirect: "/login" })
		);
	});

	it("should give the right redirect", async () => {
		sandbox.replace(SessionSequelize.prototype, "deleteSession", async () => {
			return Promise.resolve(false);
		});
		sandbox.replace(SessionMysql.prototype, "deleteSession", async () => {
			return Promise.resolve(false);
		});
		let response = await request(app)
			.post("/logout")
			.set("Cookie", "sessionId=123")
			.send({});
		expect(response.statusCode).equals(401);
		JSON.stringify({ redirect: "/login" });
	});
});
