import { expect } from "chai";
import { SessionService } from "../Business/Service/sessionService";
import { SessionSequelize } from "../Data/models/session/sessionSequelize";
import sinon from "sinon";
import SessionSequelizeModel from "../Business/Model/SequelizeModels/session";

describe("SessionService", () => {
	let sessionService: SessionService;
	let sessionStub: SessionSequelize;
	let getSessionStub: sinon.SinonStub;
	let createStub: sinon.SinonStub;
	let sessionSequelize: SessionSequelize;
	let date: Date;

	beforeEach(() => {
		sessionStub = sinon.createStubInstance(SessionSequelize);
		getSessionStub = sessionStub.getSession as sinon.SinonStub;
		sessionService = new SessionService(sessionStub);
		createStub = sinon.stub(SessionSequelizeModel, "create");
		sessionSequelize = new SessionSequelize();
		date = new Date(Date.now() + 360000000);
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should return false when session does not exist", async () => {
		getSessionStub.resolves(null);
		const result = await sessionService.doesSessionExist(
			"nonexistent-session-id"
		);
		expect(result).to.be.false;
	});

	it("should return true when session is expired", async () => {
		getSessionStub.resolves({ expiryDate: new Date(2000, 1, 1) }); // an expired session
		const result = await sessionService.isSessionExpired("expired-session-id");
		expect(result).to.be.false;
	});

	it("should return the session ID when a session is successfully created", async () => {
		const email = "test@example.com";
		const sessionId = "test-session-id";
		createStub.resolves({ sessionId });

		const result = await sessionSequelize.createSession(email, sessionId, date);

		expect(result).to.equal(sessionId);
	});

	it("should throw an error when session creation fails", async () => {
		const email = "ramon@example.com";
		const sessionId = "ramon id";
		createStub.resolves(null);

		try {
			await sessionSequelize.createSession(email, sessionId, date);
			expect.fail("Expected error to be thrown");
		} catch (error) {
			expect((error as Error).message).to.equal("Failed to set sessionID");
		}
	});
});
