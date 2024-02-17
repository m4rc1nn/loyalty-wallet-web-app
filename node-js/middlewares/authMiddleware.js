const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports.checkUserToken = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res
			.status(401)
			.json({ status: "ERROR", message: "User authorization fail." });
	}
	if (!req.headers.authorization.split(" ")[1]) {
		return res
			.status(401)
			.json({ status: "ERROR", message: "User authorization fail." });
	}
	const token = req.headers.authorization.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res
				.status(401)
				.json({ status: "ERROR", message: "User authorization fail." });
		}

		if (!decoded.user) {
			return res.status(401).json({
				status: "ERROR",
				message: "Token is invalid for user.",
			});
		}

		req.user = decoded.user;
		return next();
	});
};

module.exports.checkCompanyToken = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res
			.status(401)
			.json({ status: "ERROR", message: "Company authorization fail." });
	}
	if (!req.headers.authorization.split(" ")[1]) {
		return res
			.status(401)
			.json({ status: "ERROR", message: "Company authorization fail." });
	}
	const token = req.headers.authorization.split(" ")[1];

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				status: "ERROR",
				message: "Company authorization fail.",
			});
		}

		if (!decoded.company) {
			return res.status(401).json({
				status: "ERROR",
				message: "Token is invalid for company.",
			});
		}

		req.company = decoded.company;
		return next();
	});
};

module.exports.checkAdminToken = async (req, res, next) => {
	const token = req.headers.authorization.split(" ");

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				status: "ERROR",
				message: "Admin authorization fail.",
			});
		}

		if (!decoded.admin) {
			return res.status(401).json({
				status: "ERROR",
				message: "Token is invalid for admin.",
			});
		}

		req.admin = decoded.admin;
		return next();
	});
};
