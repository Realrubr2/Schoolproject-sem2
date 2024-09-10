/**
 * @author Ramon iro-omo
 * @description This class initializes the connection between the sequelize middleware and the database
 * it also syncs the database with the models defined in the model folder
 */

require("dotenv").config({ path: "./config.env" });

import { Sequelize } from "sequelize-typescript";

const modelDir = "../Business/Model/SequelizeModels";

let database = process.env.SCHEMA_seq_DB;

if (process.env.TEST_DB == "true") {
	database = process.env.TEST_DB_NAME;
}
export const sequelize = new Sequelize({
	database: database,
	dialect: "mysql",
	username: process.env.USER_RELATIONAL_DB,
	password: process.env.PASSWORD_RELATIONAL_DB,
	models: [__dirname + "/" + modelDir],
});
