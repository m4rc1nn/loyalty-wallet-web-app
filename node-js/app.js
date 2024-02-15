const express = require("express");

const { sequelize } = require("./database/db.js");

const authGetRouter = require("./routes/auth/GET/route.js");
const cardGetRouter = require("./routes/card/GET/route.js");
const cardPostRouter = require("./routes/card/POST/route.js");

const app = express();

app.use("/api", authGetRouter);

sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
