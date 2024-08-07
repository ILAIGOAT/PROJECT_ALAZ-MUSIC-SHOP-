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
});

router.post('/getCategoryItems', async (req, res) => {
    const { Category } = req.body;
    let names = '';
    let prices = '';
    let imgs = '';
    let colors = '';
    let ids = '';

    console.log("Received get category request with body:", req.body);

    try {
        // Query the database to find all items with the specified category
        const cursor = Item.find({ instrumenttype: Category });

        let foundAny = false;

        // Use a for await...of loop to iterate over the cursor
        for await (const item of cursor) {
            foundAny = true;
            // Concatenate item details into their respective strings
            names += `~${item.name}`;
            prices += `~${item.price}`;
            colors += `~${item.color}`;
            imgs += ` ${item.img}`;
            ids += `~${item._id}`;
        }

        if (!foundAny) {
            console.log("No Items in Category", Category);
            return res.status(400).json({ error: "No Items in Category" });
        }

        console.log("Completed item lookup");

        // Prepare the response object with concatenated item details
        const response = {
            msg: "Sending category items",
            names,
            prices,
            imgs,
            colors,
            ids
        };

        console.log("Sending response:", response);

        // Send the response with status 200
        return res.status(200).json(response);
    } catch (error) {
        // Log any errors and send a server error response
        console.error("Error during getCategoryItems:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;