const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/auth')
const { Account } = require('../db/index');
const mongoose = require('mongoose');

router.get("/balance",userMiddleware,async function(req,res){
    const userId = req.userId;
    const existingUseraccount = await Account.findOne({ userId: userId });

    res.status(200).json({
        balance:existingUseraccount.balance
    })
} )

router.post("/transfer", userMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;