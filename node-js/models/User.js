/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define(
        "user",
        {
            id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            email: { type: Sequelize.STRING },
            tempCode: { type: Sequelize.STRING },
            tempCodeExpires: { type: Sequelize.DATE },
            name: { type: Sequelize.STRING },
            isActive: { type: Sequelize.STRING, defaultValue: true },
            pushToken: { type: Sequelize.STRING },
        },
        {}
    );
    User.assiociate = (models) => {
        User.hasMany(models.Card, { foreignKey: "userId", as: "cards" });
    };
    return User;
};
