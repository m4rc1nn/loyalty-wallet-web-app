/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const LogoutToken = sequelize.define(
        "logout_token",
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            token: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        },
        {}
    );

    return LogoutToken;
};
