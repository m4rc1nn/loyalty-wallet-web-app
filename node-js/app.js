const express = require("express");

const { sequelize } = require("./database/db.js");

const authGetRouter = require("./routes/auth/GET/route.js");

const cardGetRouter = require("./routes/card/GET/route.js");
const cardPostRouter = require("./routes/card/POST/route.js");

const tempCodeGetRouter = require("./routes/temp-code/GET/route.js");
const tempCodePostRouter = require("./routes/temp-code/POST/route.js");

const userGetRouter = require("./routes/user/GET/route.js");
const userPostRouter = require("./routes/user/POST/route.js");

const app = express();

app.use("/api", authGetRouter);
app.use("/api", cardGetRouter);
app.use("/api", cardPostRouter);
app.use("/api", tempCodeGetRouter);
app.use("/api", tempCodePostRouter);
app.use("/api", userGetRouter);
app.use("/api", userPostRouter);

sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
