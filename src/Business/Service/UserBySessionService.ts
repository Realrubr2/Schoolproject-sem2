import { SessionMysql } from "../../Data/models/session/sessionMysql";
import { SessionSequelize } from "../../Data/models/session/sessionSequelize";
import { UserMysql } from "../../Data/models/users/userMysql";
import { UserSequelizeMysql } from "../../Data/models/users/userSequelize";
import { selectDataLayer } from "../../Util/dataLayerSelector";
import { Session } from "../Model/MysqlModels/session";
import { User } from "../Model/MysqlModels/user";
import { SessionService } from "./sessionService";
import { UserService } from "./userService";

/**
 * @author Ramon iro-omo
 * @class UserBySession
 * @description
 * this class exists so that u can get the user by the session
 * it imports the user service and imports the session service to return a user by session
 * you can import this class in your controller if you want to use these functions
 * !!! Please know that a cookie can only accesed sent with a post from the frontend
 */
export class UserBySessionService {
	/**
	 * the dataselecter function is present here because the service will be used inline with a lot of other interfaces and services
	 * this mean that the userbysession service will be stuck to using the userservice and the session service
	 * this can be alterd!
	 */
	private userCrudInterface = selectDataLayer<UserSequelizeMysql, UserMysql>(
		UserSequelizeMysql,
		UserMysql
	);
	private sessionCrudInterface = selectDataLayer<
		SessionSequelize,
		SessionMysql
	>(SessionSequelize, SessionMysql);

	private userService = new UserService(this.userCrudInterface);
	private sessionService = new SessionService(this.sessionCrudInterface);
	constructor() {}

  /**
   * @method getUserEmailBySession Gets the users email by the given session id
   * @param sessionId a session id can be taken from the req.cookies in a post request
   * @returns a user email
   */
  async getUserEmailBySession(sessionId: string): Promise<string | null> {
    const email: Session | null = await this.sessionService.findSession(
      sessionId
    );
    if (email == null) {
      throw new Error("no session found");
    }
    return email.email;
  }

	/**
	 *
	 * @param sessionId the session id gotten by the req.cookies method
	 * @returns A true if the session has been deletet succsesfully
	 * and it should throw an error if it cannot be deleted
	 */
	async logOutUser(sessionId: string): Promise<boolean> {
		const sessionDel = await this.sessionService.deleteSession(sessionId);
		if (!sessionDel) {
			throw new Error("error! no session to delete");
		}
		return sessionDel;
	}
}
