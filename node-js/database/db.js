/** @format */

const Sequelize = require("sequelize");
const config = require("./config.js");

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: "mysql",
    port: config.port,
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Card = require("../models/Card.js")(sequelize, Sequelize);
db.User = require("../models/User.js")(sequelize, Sequelize);
db.Company = require("../models/Company.js")(sequelize, Sequelize);
db.Action = require("../models/Action.js")(sequelize, Sequelize);
db.Reward = require("../models/Reward.js")(sequelize, Sequelize);
db.TempCode = require("../models/TempCode.js")(sequelize, Sequelize);
db.LogoutToken = require("../models/LogoutToken.js")(sequelize, Sequelize);

// Setup associations
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = { db, sequelize };
