const express = require('express');
const User = require('../models/usermodel');
const Item = require('../models/itemmodel.js')
var router = express.Router();
const bcrypt = require('bcrypt');
const { mongo } = require('mongoose');



router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    console.log("Received registration request:", req.body);

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            console.log("Email already exists:", email);
            return res.status(422).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        console.log("User registered successfully:", user);
        return res.status(201).json({ message: "Registered successfully!!" });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    

    console.log("Received login request:", req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials for email:", email);
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const username = user.username;
        const pfp = user.pfp;
        const ifadmin = user.admin;
        console.log("Login successful for email:", email);
        return res.status(200).json({ message: "Login successful for " + username, img: pfp, admin: ifadmin});
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});


router.post('/changepfp', async (req,res) => {
    const { email, pfp } = req.body;

    console.log("Recieved pfp change request:", req.body);

    try{
        const user = await User.findOneAndUpdate({email},{$set: {pfp}});
        if(!user){
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }

        console.log("Pfp Changed successful for email:", email);
        return res.status(200).json({ message: "Pfp Changed successful"});
    } catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error'});
    }
});

router.post('/changeusername', async (req,res) => {
    const { email, username } = req.body;

    console.log("Recieved username change request:", req.body);

    try{
        const user = await User.findOneAndUpdate({email},{$set: {username}});
        if(!user){
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }

        console.log("username Changed successful for email:", email);
        return res.status(200).json({ message: "username Changed successful"});
    } catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error'});
    }
})

router.post('/aprovepasswordchange', async (req,res) => {
    const { email, password } = req.body;

    console.log("Recieved Password change request:", req.body);

    try{
        const user = await User.findOne({ email });
        if(!user){
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }

        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch)
        {
            console.log("Password dont match:", email);
            return res.status(400).json({ error: "The Password That Was Entered Doesn't Match The User's Active Password" });
        }
        
        console.log("Password Change Aproved for email:", email);
        return res.status(200).json({ message: "Password Change Aproved"});
    } catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error'});
    }
})


router.post('/changeuserpass', async (req,res) => {
    const { email, password } = req.body;

    console.log("Recieved Password change request:", req.body);

    try{
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.findOneAndUpdate({email},{$set: {password:hashedPass}});
        if(!user){
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }

        console.log("password Changed successful for email:", email);
        return res.status(200).json({ message: "password Changed successful"});
    } catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error'});
    }
})


router.post('/deleteuseraccount', async (req,res) => {
    const { email, password, enteredemail } = req.body;

    console.log("Recieved Delete Account request:", req.body);

    try{
        const user = await User.findOne({ email });
        if(!user){
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }

        const match = await (bcrypt.compare(password, user.password)) && (user.email === enteredemail);
        if(!match)
        {
            console.log("Password or email dont match the connected user:", email);
            return res.status(400).json({ error: "The Password Or The Email That Was Entered Doesn't Match The Connected User's"});
        }

        await User.deleteOne({email});
        console.log("Account Deleted for email:", email);
        return res.status(200).json({ message: "User Account Deleted"});
    } catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error'});
    }
})

router.post('/getCartItems', async (req, res) => {
    const { email } = req.body;
    let names = '';
    let prices = '';
    let imgs = '';
    let amounts = '';
    let ids ='';

    console.log("Received get cart request with body:", req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({ error: "User not found" });
        }

        console.log("User found:", user);

        for (let i = 0; i < user.cart.length; i++) {
            const itemId = user.cart[i];
            console.log(`Looking for item with ID: ${itemId}`);
            const item = await Item.findOne({ _id: itemId });
            if (item) {
                console.log(`Item found: ${item}`);
                names += `~${item.name}`;
                prices += `~${item.price}`;
                imgs += ` ${item.img}`;
                ids += ` ${item._id}`;
            } else {
                console.log(`Item not found for ID: ${itemId}`);
            }
        }

        console.log("Completed item lookup");

        for (let i = 0; i < user.cartAmounts.length; i++) {
            amounts += `~${user.cartAmounts[i]}`;
        }

        console.log("Cart amounts:", amounts);

        const response = {
            msg: "Sending cart items",
            names,
            prices,
            imgs,
            amounts,
            ids
        };

        console.log("Sending response:", response);

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error during getCartItems:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post('/removeFromCart', async (req, res) => {
    const { email, itemId } = req.body;
    console.log("Received remove from cart request:", req.body);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }

        console.log("User cart before removal:", user.cart);
        console.log("User cart amounts before removal:", user.cartAmounts);
        console.log("Item ID to remove:", itemId);

        const itemIndex = user.cart.findIndex((element) => element.toString() === itemId);
        if (itemIndex === -1) {
            console.log("Item not found in cart:", itemId);
            console.log(email)
            return res.status(400).json({ error: "Item not found in cart" });
        }

        user.cart.splice(itemIndex, 1);
        user.cartAmounts.splice(itemIndex, 1);

        console.log("Attempting to save user after removal...");
        await user.save();
        console.log("User save operation completed.");

        console.log("User cart after removal:", user.cart);
        console.log("User cart amounts after removal:", user.cartAmounts);
        console.log("Removal from cart successful for email:", email);

        return res.status(200).json({ message: "Removal from cart successful" });
    } catch (error) {
        console.error("Error during remove from cart:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post('/giveadmin', async (req,res) => {
    const { email } = req.body;

    console.log("Recieved Admin request:", req.body);

    try{
        const user = await User.findOneAndUpdate({ email },{$set: {admin:true}});
        if(!user){
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }
        
        console.log("Admin Was Given To:", email);
        return res.status(200).json({ message: "New Admin Was Given"});
    } catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error'});
    }
})

router.post('/takeadmin', async (req,res) => {
    const { email } = req.body;

    console.log("Recieved Take Admin request:", req.body);

    try{
        const user = await User.findOneAndUpdate({ email },{$set: {admin:false}});
        if(!user){
            console.log("User not found:", email);
            return res.status(400).json({ error: "User not found" });
        }
       
        console.log("Admin Was Taken From:", email);
        return res.status(200).json({ message: "New Admin Was Taken"});
    } catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error'});
    }
})

router.post('/addtocart', async (req,res) => {
    const { email, ItemId, Amount } = req.body;

    console.log("Add Item to cart request:", req.body);

    try{
        const item = await Item.findOne({ _id: ItemId });
        if(!item){
            console.log("Item not found:", ItemId);
            return res.status(400).json({ error: "item not found" });
        }
        const user = await User.findOne({ email });
        if(!user)
        {
            console.log("User not found:", email);
            return res.status(400).json({ error: "user not found" });
        }

        user.cart.push(item);
        user.cartAmounts.push(Amount);
        await user.save();
        
        console.log("Item Was Added for:", email);
        return res.status(200).json({ message: "Item was added to cart"});
    } catch(error){
        console.error("Error adding new item:", error);
        return res.status(500).json({ error: 'Server error'});
    }
})
module.exports = router;