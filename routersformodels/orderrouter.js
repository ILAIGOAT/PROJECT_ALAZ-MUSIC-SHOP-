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
});

router.post('/getOrders', async (req, res) => {
    const { email } = req.body;
    let ids = '';
    let addresses = '';
    let carts = '';
    let cartAmounts = '';
    let totalPrices ='';
    let emails = '';
    let dates ='';

    console.log("Received get cart request with body:", req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({ error: "User not found" });
        }

        console.log("User found:", user);
        
        let orders;
        if (user.admin) {
            orders = await Order.find();
        } else {
            orders = await Order.find({ _id: { $in: user.orders } });
        }

        for (const order of orders) {
            console.log(`Order found: ${order}`);
            ids += `~${order._id}`;
            addresses += `~${order.address}`;
            carts += `~${order.cart}`;
            cartAmounts += `~${order.cartAmounts}`;
            totalPrices += `~${order.totalprice}`;
            emails += `~${order.useremail}`;
            dates += `~${order.date}`;
        }

        console.log("Completed order lookup");

        const response = {
            msg: "Sending Orders",
            ids, 
            addresses,
            carts,
            cartAmounts,
            totalPrices,
            emails, 
            dates
        };

        console.log("Sending response:", response);

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error during getOrders:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});


router.post('/deleteorder', async (req, res) => {
    const { orderid } = req.body;

    console.log("Received Delete Order request:", req.body);

    try {
        
        const order = await Order.findOne({_id: orderid});
        if(!order)
        {
            console.log("Order not exists:", orderid);
            return res.status(422).json({ error: "Order not found" });
        }
        const user = await User.findOne({email: order.useremail});
        if (user) {
            index = user.orders.findIndex((element) => element.toString() === orderid);
            user.orders.splice(index,1);
        }
        await Order.deleteOne({_id: orderid});
        await user.save();
        console.log("Order was Deleted successfully:", user);
        return res.status(201).json({ message: "Order Deleted successfully!!" });
    } catch (error) {
        console.error("Error during Deleting Order product:", error);
        return res.status(500).json({ error: 'Server error' });
    }
})
module.exports = router;