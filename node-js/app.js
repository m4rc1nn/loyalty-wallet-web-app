const express = require("express");

const { sequelize } = require("./database/db.js");

const app = express();

sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
