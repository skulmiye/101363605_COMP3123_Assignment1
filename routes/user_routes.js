const express = require('express');
const UserModel = require('../models/user.js');

const router = express.Router();

// Route to allow user to create a new account
// http://localhost:8082/api/v1/user/signup
router.post("/signup", async (req, res) => {
    try {
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save(); // Save the new user

        res.status(201).send(newUser)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Route to allow user to login with either email or username
// http://localhost:8082/api/v1/user/login
router.post("/login", async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Check if the provided input is an email address
        const isEmail = usernameOrEmail.includes('@');

        let user;
        if (isEmail) {
            user = await UserModel.findOne({ email: usernameOrEmail, password });
        } else {
            user = await UserModel.findOne({ username: usernameOrEmail, password });
        }

        if (!user) {
            throw new Error('Invalid Username/Email or password');
        }

        const response = {
            status: true,
            username: user.username,
            message: "User logged in successfully"
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        const response = {
            status: false,
            message: error.message || "Internal server error"
        };
        res.status(500).json(response);
    }
});


module.exports = router;
