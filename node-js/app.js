const express = require("express");

const { db } = require("./database/db.js");

const authGetRouter = require("./routes/auth/GET/route.js");

const actionGetRouter = require("./routes/action/GET/route.js");
const actionPostRouter = require("./routes/action/POST/route.js");

const cardPostRouter = require("./routes/card/POST/route.js");

const companyPostRouter = require("./routes/company/POST/route.js");

const rewardGetRouter = require("./routes/reward/GET/route.js");
const rewardPostRouter = require("./routes/reward/POST/route.js");

const tempCodeGetRouter = require("./routes/temp-code/GET/route.js");
const tempCodePostRouter = require("./routes/temp-code/POST/route.js");

const userGetRouter = require("./routes/user/GET/route.js");
const userPostRouter = require("./routes/user/POST/route.js");

const app = express();

app.use("/api", authGetRouter);
app.use("/api", actionGetRouter);
app.use("/api", actionPostRouter);
app.use("/api", cardPostRouter);
app.use("/api", companyPostRouter);
app.use("/api", rewardGetRouter);
app.use("/api", rewardPostRouter);
app.use("/api", tempCodeGetRouter);
app.use("/api", tempCodePostRouter);
app.use("/api", userGetRouter);
app.use("/api", userPostRouter);

db.sequelize.sync({ alter: true }).then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`Server running on port ${process.env.PORT}`);
	});
});
