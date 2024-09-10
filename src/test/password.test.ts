/**
 * @author Dannique Klaver
 */
import * as tssinon from "ts-sinon";
import { expect } from "chai";
import { PasswordServiceHandler } from "../Business/Service/password/passwordServiceHandler";
import { PasswordQueryService } from "../Business/Service/password/passwordQueryService";
import { EmailValidationService } from "../Business/Service/password/emailValidationService";
import { PasswordValidationService } from "../Business/Service/password/passwordValidationService";
import { UserValidationService } from "../Business/Service/password/userValidationService";
import { LoginController } from "../Controller/passwordController";
import { passwordCrudInterface } from "../Data/interface/passwordCrudInterface";
import { Password } from "../Business/Model/MysqlModels/password";
import { LoginData } from "../Business/Model/MysqlModels/login";
import * as argon2 from "argon2";
import { SessionService } from "../Business/Service/sessionService";

const sandbox = tssinon.default.createSandbox();

describe("User Login Tests", () => {
	const fakeUserPassword: Password[] = [
		new Password(
			new Date("2019-02-22T00:00:00"),
			"test1@jordit.com",
			"$argon2id$v=19$m=65536,t=3,p=4$8eGN7EYt4K04jozF2V1Nmw$FbRSLVZeAW80ZN5OG/TNBBsPEN53JTUwQBSFKTapRM0",
			new Date("2030-03-14T00:00:00")
		),
	];

	let passwordQueryService: PasswordQueryService;
	let emailValidationService: EmailValidationService;
	let passwordValidationService: PasswordValidationService;
	let userValidationService: UserValidationService;
	let passwordServiceHandler: PasswordServiceHandler;
	let loginController: LoginController;
	let passwordCrudInterface: passwordCrudInterface;
	let loginData: LoginData;
	let sessionService: SessionService;

	beforeEach(() => {
		loginController = new LoginController(
			passwordServiceHandler,
			sessionService
		);
		passwordQueryService = new PasswordQueryService(passwordCrudInterface);
		emailValidationService = new EmailValidationService();
		passwordValidationService = new PasswordValidationService();
		userValidationService = new UserValidationService();

		passwordServiceHandler = new PasswordServiceHandler(
			emailValidationService,
			passwordValidationService,
			userValidationService,
			passwordQueryService
		);

		loginData = new LoginData("test1@jordit.com", "Password123");

		sandbox
			.stub(passwordQueryService, "getPasswordsByEmail")
			.returns(Promise.resolve(fakeUserPassword));
	});

	afterEach(() => {
		sandbox.restore();
		tssinon.default.restore();
	});

	// userValidationService
	it("should throw an error if passwordDataArray is empty", () => {
		let fakeUserPasswordEmpty: Password[];

		expect(() =>
			userValidationService.validateUserRegistration(fakeUserPasswordEmpty, {})
		).to.throw("User is not registered");
	});

	it("should not throw an error if passwordDataArray is not null or empty", () => {
		expect(() =>
			userValidationService.validateUserRegistration(fakeUserPassword, {})
		).to.not.throw();
	});

	// emailValidationService

	it("should throw an error if email is empty", () => {
		loginData = new LoginData("", "testPassword");
		expect(() =>
			emailValidationService.validateEmail(loginData.getEmail(), {})
		).to.throw("Email field must not be empty");
	});
	it("should throw an error if email format is invalid", () => {
		loginData = new LoginData("invalidEmail", "testPassword");
		expect(() =>
			emailValidationService.validateEmail(loginData.getEmail(), {})
		).to.throw("Invalid email format");
	});

	it("should throw an error if email does not end with '@jordit.com'", () => {
		loginData = new LoginData("jan.password@test.com", "testPassword");
		expect(() =>
			emailValidationService.validateEmail(loginData.getEmail(), {})
		).to.throw("Incorrect email, please use an email ending in '@jordit.com'.");
	});

	it("should validate email correctly", () => {
		expect(() =>
			emailValidationService.validateEmail(loginData.getEmail(), {})
		).to.not.throw();
	});

	// passwordValidationService

	it("should throw an error if password is empty", () => {
		expect(() =>
			passwordValidationService.validatePasswordLength("", {})
		).to.throw("Password field must not be empty");
	});

	it("should throw an error if password is shorter than 8 characters", () => {
		expect(() =>
			passwordValidationService.validatePasswordLength("short", {})
		).to.throw("Password must be at least 8 characters long");
	});

	it("should not throw an error if password is 8 characters or longer", () => {
		expect(() =>
			passwordValidationService.validatePasswordLength("longpassword", {})
		).to.not.throw();
	});

	it("should throw an error if password is incorrect", async () => {
		try {
			await passwordValidationService.validatePasswordData(
				fakeUserPassword,
				"incorrectPassword"
			);
		} catch (error: any) {
			expect(error.message).to.equal("Incorrect password, please try again");
		}
	});

	it("should throw an error if password is expired", async () => {
		const passwordDataArray: Password[] = [
			new Password(
				new Date(),
				"test@jordit.com",
				await argon2.hash("correctPassword"),
				new Date("2000-01-01")
			),
		];
		try {
			await passwordValidationService.validatePasswordData(
				passwordDataArray,
				"correctPassword"
			);
		} catch (error: any) {
			expect(error.message).to.equal(
				"Password is expired, please reset your password or use a new password"
			);
		}
	});

	it("should return password data if password is correct and not expired", async () => {
		const passwordDataArray: Password[] = [
			new Password(
				new Date(),
				"test@jordit.com",
				await argon2.hash("correctPassword"),
				new Date("3000-01-01")
			),
		];
		const result = await passwordValidationService.validatePasswordData(
			passwordDataArray,
			"correctPassword"
		);
		expect(result).to.equal(passwordDataArray[0]);
	});

	it("should return false if password is incorrect", async () => {
		const result = await passwordValidationService.verifyPassword(
			await argon2.hash("correctPassword"),
			"incorrectPassword"
		);
		expect(result).to.be.false;
	});

	it("should return true if password is correct", async () => {
		const result = await passwordValidationService.verifyPassword(
			await argon2.hash("correctPassword"),
			"correctPassword"
		);
		expect(result).to.be.true;
	});
});
