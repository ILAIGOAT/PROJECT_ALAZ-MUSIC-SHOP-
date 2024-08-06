const express = require('express');
const Item = require('../models/itemmodel');
var router = express.Router();
const bcrypt = require('bcrypt');

router.post('/addproduct', async (req, res) => {
    const { name, script, color, price, instrumenttype, img } = req.body;

    console.log("Received add product request:", req.body);

    try {
        const ProductExist = await Item.findOne({ $and: [{ name },{ img }] });
        if (ProductExist) {
            console.log("Product already exists:", email);
            return res.status(422).json({ error: "Product already exists" });
        }

        const item = new Item({
            name,
            script,
            color,
            price,
            instrumenttype,
            img
        });

        await item.save();
        console.log("Product was added successfully:", item);
        return res.status(201).json({ message: "Added successfully!!" });
    } catch (error) {
        console.error("Error during adding new product:", error);
        return res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;