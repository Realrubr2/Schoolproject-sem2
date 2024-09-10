/**
 * @author Ramon iro-omo
 * @description This file represents the sequelize model of the data being used
 * A better description can be found in the travelVehicle file!
 */
import { DATEONLY } from "sequelize";
import {
	AllowNull,
	Column,
	DataType,
	Model,
	Table,
} from "sequelize-typescript";

/**
 * @timestamps is true this means that the table gets the updated at and created add inside the table
 */
@Table({
	tableName: "session",
	timestamps: true,
})
export default class SessionSequelizeModel extends Model {
	@Column({
		type: DataType.STRING,
		allowNull: false,
		primaryKey: true,
	})
	declare sessionId: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		references: { key: "email", model: "user" },
	})
	declare email: string;

	@Column({
		type: DATEONLY,
		allowNull: false,
	})
	declare expiryDate: Date;
}
