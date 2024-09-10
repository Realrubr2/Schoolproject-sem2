export function selectDataLayer<Sequelize, Mysql>(
	sequelize: new () => Sequelize,
	mysql: new () => Mysql
): Sequelize | Mysql {
	let dataLayer: Sequelize | Mysql;
	if (process.env.DATA_LAYER === "sequelize") {
		dataLayer = new sequelize();
	} else if (process.env.DATA_LAYER === "mysql") {
		dataLayer = new mysql();
	} else {
		throw new Error("No valid data layer selected.");
	}
	return dataLayer;
}
