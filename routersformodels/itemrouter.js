const express = require('express');
const Item = require('../models/itemmodel');
var router = express.Router();
const bcrypt = require('bcrypt');

router.post('/addproduct', async (req, res) => {
    const { name, price, instrumenttype, img } = req.body;

    console.log("Received add product request:", req.body);

    try {
        const ProductExist = await Item.findOne({ $and: [{ name },{ img }] });
        if (ProductExist) {
            console.log("Product already exists:", email);
            return res.status(422).json({ error: "Product already exists" });
        }

        const item = new Item({
            name,
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
    const { Category,min,max } = req.body;
    let names = '';
    let prices = '';
    let imgs = '';
    let colors = '';
    let ids = '';

    console.log("Received get category request with body:", req.body);

    try {
        
        const cursor = Item.find({
            instrumenttype: Category,
            price: { $gte: min, $lte: max }
        });

        let foundAny = false;

        
        for await (const item of cursor) {
            foundAny = true;
            
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

        
        const response = {
            msg: "Sending category items",
            names,
            prices,
            imgs,
            colors,
            ids
        };

        console.log("Sending response:", response);

        
        return res.status(200).json(response);
    } catch (error) {
        
        console.error("Error during getCategoryItems:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post('/removeproduct', async (req, res) => {
    const { name } = req.body;

    console.log("Received remove Product request:", req.body);

    try {
        const ProductExist = await Item.findOne({ name });
        if (!ProductExist) {
            console.log("Product doesnt exists:", name);
            return res.status(422).json({ error: "Product Doesnt exists" });
        }

        await Item.deleteOne({name});
        
        console.log("Product was Deleted successfully:", name);
        return res.status(201).json({ message: "Deleted successfully!!" });
    } catch (error) {
        console.error("Error during deleting new product:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;