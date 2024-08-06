const express = require('express');
const Order = require('../models/ordermodel');
const User = require('../models/usermodel.js');
const Item = require('../models/itemmodel.js');
var router = express.Router();
const bcrypt = require('bcrypt');

router.post('/addorder', async (req, res) => {
    const { address, cart, cartAmounts, totalprice, useremail } = req.body;

    console.log("Received add order request:", req.body);

    try {
        const order = new Order({
            address,
            cart,
            cartAmounts,
            totalprice,
            useremail
        });

        await order.save();
        console.log("Product was added successfully:", order);


        const user = await User.findOne({email: useremail});
        if (!user) {
            console.log("User not exists:", email);
            return res.status(422).json({ error: "User not found" });
        }
        user.cart = [];
        user.cartAmounts = [];
        user.orders.push(order._id);
        await user.save();
        return res.status(201).json({ message: "Order Made successfully!!" });
    } catch (error) {
        console.error("Error during Making New Orders product:", error);
        return res.status(500).json({ error: 'Server error' });
    }
})
module.exports = router;