/**
 * @author Dannique Klaver
 * @description This class is responsible for the password model.
 */

import { Column, DataType, Model, Table } from "sequelize-typescript";

/**
 * Sequelize model for passwords
 */
@Table({
	tableName: "password",
	timestamps: false,
})
export default class PasswordSequelize extends Model {
	@Column({
		type: DataType.DATE,
		allowNull: false,
		primaryKey: true,
		validate: {
			isDate: true,
			notNull: {
				msg: "Error in your password: registration date is required",
			},
		},
	})
	declare registerDate: Date; // The date when the password was registered

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		references: { key: "email", model: "user" },
		validate: {
			isEmail: true,
			notNull: {
				msg: "Email cannot be empty",
			},
		},
	})
	declare email: string; // The email associated with the password

	@Column({
		type: DataType.STRING(255),
		allowNull: true,
		validate: {
			notEmpty: {
				msg: "Password cannot be empty",
			},
		},
	})
	declare hashedPassword: string; // The hashed version of the password

	@Column({
		type: DataType.DATE,
		allowNull: true,
		validate: {
			isDate: true,
			isAfter: {
				args: new Date().toISOString(),
				msg: "Password has expired, please reset your password",
			},
		},
	})
	declare expiryDate: Date; // The date when the password will expire
}
