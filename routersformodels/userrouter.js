const express = require('express');
const User = require('../models/usermodel');
var router = express.Router();
const bcrypt = require('bcrypt');



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
})

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
module.exports = router;