import { Column, DataType, Model, Table } from "sequelize-typescript";

/**
 * @author ramon iro-omo
 * this file contains the model for the user table
 */

/**
 * @description This class is a model for the user table
 * it uses sequelize decorators
 */
@Table({
	tableName: "user",
	timestamps: false,
})
export default class UserSequelize extends Model {
	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		primaryKey: true,
	})
	declare email: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		references: { key: "department", model: "department" },
	})
	declare department: string;

	@Column({
		type: DataType.ENUM("gebruiker", "beheer", "management", "gedeactiveerd"),
		allowNull: true,
	})
	declare role: string;
}
