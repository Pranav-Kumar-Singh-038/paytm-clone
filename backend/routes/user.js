const express = require('express');
const router = express.Router();
const { User, Account } = require('../db/index');
const { zodUser, zodUserin } = require('../types');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;
const userMiddleware = require('../middlewares/auth')
const partialUserSchema = zodUser.partial();

router.post('/signup', async function (req, res) {
    const { username, password, lastName, firstName } = req.body;
    const validationResult = zodUser.safeParse(req.body)
    if (!validationResult.success) {
        return res.status(400).json({ "msg": validationResult.error.issues[0].message })
    }
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        return res.status(411).json({ "msg": "username already exists." })
    }

    const user = await User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password
    })
    const userId = user._id;

    
    await Account.create({
        userId,
        balance: parseFloat((1 + Math.random() * 9999).toFixed(2)) 
    })

    
    const token = jwt.sign({
        userId
    }, JWT_SECRET);


    res.json({
        message: "User created successfully",
        token: token,
    })
})

router.post('/signin', async function (req, res) {
    const { username, password } = req.body;
    const validationResult = zodUserin.safeParse(req.body);
    if (!validationResult.success) {
        const messages = validationResult.error.issues.map(issue => issue.message).join(", ");
        return res.status(400).json({ "msg": messages });
    }
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return res.status(404).json({ "msg": "user doesn't exist." });
    } else if (existingUser.password != password) {
        return res.status(400).json({ "msg": "Wrong Password, please try again" });
    }
    else {
        try {
            const userId = existingUser._id;
            const token = jwt.sign({ userId }, JWT_SECRET);
            res.json({ token: token });
        } catch (error) {
            return res.status(400).json({ "error": error });
        }
    }
});

router.put('/', userMiddleware, async function (req, res) {
    const userId = req.userId;
    const { password, lastName, firstName } = req.body;


    const validationResult = partialUserSchema.safeParse(req.body);
    if (!validationResult.success) {
        const messages = validationResult.error.issues.map(issue => issue.message).join(", ");
        return res.status(400).json({ "msg": messages });
    }

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ "msg": "User doesn't exist." });
        } else {

            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                }
            }, { new: true });
            res.json({ "msg": "User data updated successfully" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating user data"
        });
    }
});


router.get('/bulk', userMiddleware, async function (req, res) {
    try {
        const filter = req.query.filter || "";
        const findResult = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })

        res.json(findResult);
    } catch (error) {
        res.status(500).send("Failed to retrieve users.");
    }
});


module.exports = router;