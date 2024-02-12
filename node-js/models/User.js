/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define(
        "user",
        {
            id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            email: { type: Sequelize.STRING },
            name: Sequelize.STRING,
            isActive: { type: Sequelize.STRING, defaultValue: true },
            pushToken: Sequelize.STRING,
        },
        {}
    );
    User.assiociate = (models) => {
        User.hasMany(models.Card, { foreignKey: "userId", as: "cards" });
    };
    return User;
};
