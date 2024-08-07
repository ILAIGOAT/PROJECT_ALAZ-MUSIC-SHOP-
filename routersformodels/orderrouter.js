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
        const user = await User.findOne({email: useremail});
        if (!user) {
            console.log("User not exists:", useremail);
            return res.status(422).json({ error: "User not found" });
        }
        console.log(user.cart.length)
        if(user.cart.length === 0)
        {
            console.log("Cart Empty For:", useremail);
            return res.status(422).json({ error: "Cart Is Empty !, Add Some Things In Order To Checkout!" });
        }
            
        const order = new Order({
            address,
            cart,
            cartAmounts,
            totalprice,
            useremail
        });

        await order.save();
        console.log("Product was added successfully:", order);


        
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



router.get('/order-stats', async (req, res) => {
    try {
        const orders = await Order.find().populate('cart');
        const instrumentCount = {};

        orders.forEach(order => {
            order.cart.forEach((item, index) => {
                const instrumentType = item.instrumenttype;
                const amountOrdered = order.cartAmounts[index];
                if (!instrumentCount[instrumentType]) {
                    instrumentCount[instrumentType] = 0;
                }
                instrumentCount[instrumentType] += amountOrdered;
            });
        });

        res.json(instrumentCount);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/orders-over-time', async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/order-heatmap', async (req, res) => {

    try {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
module.exports = router;