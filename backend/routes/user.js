const express = require('express');
const router = express.Router();
const { User } = require('../db/index');
const { zodUser, zodUserin } = require('../types');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../config");

router.post('/signup', async function (req, res) {
    const { username, password, lastName, firstName } = req.body;
    const validationResult = zodUser.safeParse(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ "msg": validationResult.error.issues[0].message })
    }
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        return res.status(411).json({"msg":"username already exists."})
    }

    const user = await User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin', async function (req, res) {
    const { username, password } = req.body;
    const validationResult = zodUserin.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ "msg": validationResult.error.issues.message });
    }
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return res.status(411).json({ "msg": "user doesn't exist." });
    } else if (existingUser.password != password) {
        return res.status(400).json({ "msg": "Wrong Password, please try again" });
    }
    else
    {
    try {
        const userId = existingUser._id;
        const token = jwt.sign({ userId }, JWT_SECRET);
        res.json({ token: token });
    } catch (error) {
        res.status(500).json({
            message: "Error while logging in"
        });
    }
}
});


module.exports =  router ;