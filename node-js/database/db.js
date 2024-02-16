/** @format */

const Sequelize = require("sequelize");
const config = require("./config.js");

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		dialect: "mysql",
		port: config.port,
		logging: true,
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Card = require("../models/Card")(sequelize, Sequelize);
db.User = require("../models/User")(sequelize, Sequelize);
db.Company = require("../models/Company")(sequelize, Sequelize);
db.Action = require("../models/Action")(sequelize, Sequelize);
db.Reward = require("../models/Reward")(sequelize, Sequelize);
db.TempCode = require("../models/TempCode")(sequelize, Sequelize);

// Setup associations
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

module.exports = { db, sequelize };
