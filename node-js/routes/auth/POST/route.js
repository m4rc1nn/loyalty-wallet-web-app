const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { db } = require("../../../database/db");

require("dotenv").config();

router.post(
	"/auth/company/register",
	[
		// Validation rules
		body("email", "Invalid email").isEmail(),
		body(
			"password",
			"Password must be at least 6 characters long"
		).isLength({ min: 6 }),
		body("name", "Name is required").not().isEmpty(),
		// Check if password and confirmedPassword match
		check("confirmedPassword", "Passwords do not match").custom(
			(value, { req }) => value === req.body.password
		),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				type: "ERROR",
				errors: errors.array(),
			});
		}

		const { email, password, name } = req.body; // Destructure the needed fields from the request body

		try {
			// Check if company already exists
			const existingCompany = await db.Company.findOne({
				where: { email },
			});
			if (existingCompany) {
				return res.status(400).json({
					type: "ERROR",
					message: "Company already exists",
				});
			}

			// Hash the password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Create new company with hashed password
			const company = await db.Company.create({
				email,
				password: hashedPassword,
				name,
			});

			return res.status(201).json({
				status: "SUCCESS",
				company: {
					id: company.id,
					email: company.email,
					name: company.name,
				},
			});
		} catch (error) {
			return res.status(500).json({
				type: "ERROR",
				message: error.message,
			});
		}
	}
);

router.post(
	"/auth/company/login",
	[
		// Validation rules
		body("email", "Invalid email").isEmail(),
		body("password", "Password is required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				type: "ERROR",
				errors: errors.array(),
			});
		}

		const { email, password } = req.body; // Destructure the needed fields from the request body

		console.log(email, password);

		try {
			// Find company by email
			const company = await db.Company.findOne({ where: { email } });
			if (!company) {
				return res.status(400).json({
					type: "ERROR",
					message: "Company not found",
				});
			}

			// Check if password matches
			const validPassword = await bcrypt.compare(
				password,
				company.password
			);
			if (!validPassword) {
				return res.status(400).json({
					type: "ERROR",
					message: "Invalid password",
				});
			}

			const token = jwt.sign(
				{ company: company },
				process.env.JWT_SECRET,
				{
					expiresIn: "7d", // Token będzie ważny przez 1 dzień
				}
			);

			// Successfully logged in
			return res.status(200).json({
				status: "SUCCESS",
				company: company,
				token: token,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				type: "ERROR",
				message: error.message,
			});
		}
	}
);

router.post(
	"/auth/user/login",
	body("email").isEmail(),
	body("authToken").isString(),
	async (req, res) => {
		const userData = req.body; // Pobierz dane użytkownika z ciała żądania
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				return res.status(400).json({
					type: "ERROR",
					message: result.array(),
				});
			}

			const userExist = await db.User.findOne({
				where: { authToken: userData.authToken },
			});

			if (userExist) {
				const token = jwt.sign(
					{ user: userExist },
					process.env.JWT_SECRET,
					{
						expiresIn: "7d", // Token będzie ważny przez 1 dzień
					}
				);
				return res.status(200).json({
					type: "SUCCESS",
					user: userExist,
					token: token,
				});
			}

			const user = await db.User.create(userData); // Utwórz użytkownika z przekazanych danych

			// Wygeneruj token JWT
			const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
				expiresIn: "7d", // Token będzie ważny przez 1 dzień
			});

			// Zwróć odpowiedź zawierającą token i dane użytkownika
			return res.status(200).json({
				status: "SUCCESS",
				user: user,
				token: token,
			});
		} catch (error) {
			return res.status(500).json({
				type: "ERROR",
				message: error.message,
			});
		}
	}
);

module.exports = router;
