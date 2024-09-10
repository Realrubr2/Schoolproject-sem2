import { Column, DataType, Model, Table } from "sequelize-typescript";

/**
 * @author Ramon Iro-omo
 * @export interface travelVechicle the export interface of the travelVechile
 * It is posible to make a class out of this so that data can be checked and maipulatedn
 */

/**
 * @table refers to the values of the table itself the table name will be
 * @travelvehicle
 * and timestamp false represents that there are no timstamps being made evertime data is manipulated in the table
 */
@Table({
	tableName: "travelvehicle",
	timestamps: false,
})
export default class TravelVehicleSequelize extends Model {
	/**
	 * @column refers to the data that needs to be in the column
	 * the dataType @Date refers to the type @DATETIME if you want to refer to @DATE you would have to use @DATEONLY
	 * more can be found: https:referencessequelize.org/docs/v7/models/data-types/
	 * @references Refers said key to another table making a foreign key
	 * @declare is where you declare the name of said collumn
	 */
	@Column({
		type: DataType.DATE,
		allowNull: false,
		references: { key: "dateTime", model: "travel" },
	})
	declare dateTime: Date;
	@Column({
		type: DataType.STRING(45),
		allowNull: true,
		references: { key: "vehicleType", model: "vehicletype" },
	})
	declare vehicleType: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: true,
		references: { key: "fuelType", model: "vehicletype" },
	})
	declare fuelType: string;

	@Column({
		type: DataType.DECIMAL(10, 0),
		allowNull: true,
	})
	declare km: number;

	@Column({
		type: DataType.DECIMAL(10, 0),
		allowNull: true,
	})
	declare euro: number;
}
