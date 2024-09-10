import express from "express";
import { sequelize } from "./Util/sequelizeDatabase";
import { RoutesUser } from "./Routes/routesuser";
import { sessionMiddleware } from "./Util/middleware";
import { RoutesPassword } from "./Routes/routesPassword";
import cookieParser from "cookie-parser";
import { RoutesCarLoan } from "./Routes/routesCarLoan";
import { RoutesTravel } from "./Routes/routesTravel";
import { RoutesVehicle } from "./Routes/routesVehicle";
import { RoutesDepartment } from "./Routes/routesDepartment";
import { RoutesSignUp } from "./Routes/routesSignUp";
import { RoutesPrivateVehicle } from "./Routes/routesPrivateVehicle";
import { RoutesLocation } from "./Routes/routesLocation";
/**
 * @author ramon iro-omo
 * This class initializes the express server
 * @class initializeExpress
 * @constructor loads all the needed middleware at startup
 * @method enableCors enables cors (cross origin resource sharing)
 *
 */

export const app = express();

/**
 * @class Server is made for initialising express and having a singleton instance creator method inside
 * to ensure that there is only one server instance active because of npm run debug not properly closing a server instance and giving the error  ' Error: listen EADDRINUSE: address already in use :::3002'
 */
class Server {
	private static instance: Server;
	public app: express.Express;

	private constructor() {
		this.app = app;
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.setupcors();
	}

	public static getInstance(): Server {
		if (!Server.instance) {
			Server.instance = new Server();
		}
		return Server.instance;
	}

	public start(port: number) {
		try {
			this.app.listen(port, () => {
				console.log(`Server is running on localhost:${port}`);
			});
		} catch (error) {
			console.log("theres already an connection");
		}
	}
	setupcors() {
		app.use(function (
			req: express.Request,
			res: express.Response,
			next: express.NextFunction
		) {
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
			res.setHeader(
				"Access-Control-Allow-Methods",
				"GET, POST, OPTIONS, PUT, PATCH, DELETE"
			);
			res.setHeader(
				"Access-Control-Allow-Headers",
				"X-Requested-With,content-type"
			);
			res.setHeader("Access-Control-Allow-Credentials", "true");
			next();
		});
	}
}

/**
 * syncs the sequelize
 * inside an if statement to only sync if the test db is not active!
 */
if (process.env.TEST_DB !== "test") {
	sequelize
		.sync()
		.then((data) => console.log("sequelize connected"))
		.catch((error) => console.error("Failed to connect:", error));
}

const server = Server.getInstance();

/**
 * @author ramon iro-omo
 * Uses the cookieparser middleware
 */
app.use(cookieParser());

/**
 *
 * @sessionMiddleware
 * Uses the written middleware isloggedIn this checks the cookies
 */
// app.use(sessionMiddleware);
/**
 * starts the server
 */
server.start(3002);

app.get("/", (req: express.Request, res: express.Response) => {});

const routesuser = new RoutesUser();
routesuser.userRoutes();

/**
 * @author Storm Verwer
 */
const carLoanRoutes = new RoutesCarLoan();
carLoanRoutes.carLoanRoutes();

/**
 * @author Dannique Klaver
 * This class initializes the express server and sets up the routes for the travel data.
 */
const travelRoutes = new RoutesTravel();
travelRoutes.travelRoutes();

/**
 * @author Dannique Klaver
 * This class initializes the express server and sets up the routes for the password data.
 */
const loginRoutes = new RoutesPassword();
loginRoutes.passwordRoutes();

/**
 * @author Dannique Klaver
 * This class initializes the express server and sets up the routes for the vehicle data.
 */
const routesVehicle = new RoutesVehicle();
routesVehicle.vehicleRoutes();

/**
 * @author Dannique Klaver
 * This class initializes the express server and sets up the routes for the department data.
 */
const routesDepartment = new RoutesDepartment();
routesDepartment.departmentRoutes();

/**
 * @author Britt Rood
 * This class initializes the express server and sets up the routes for the sign-up data.
 */
const signUpRoutes = new RoutesSignUp();
signUpRoutes.signUpRoutes();

/**
 * @author Dax Riool
 * This class initializes the express server and sets up the routes for the private vehicle data.
 */
const routesPrivateVehicle = new RoutesPrivateVehicle();
routesPrivateVehicle.privateVehicleRoutes();

/**
 * @author Dax Riool
 * This class initializes the express server and sets up the routes for the location data.
 */
const routesLocation = new RoutesLocation();
routesLocation.locationRoutes();
