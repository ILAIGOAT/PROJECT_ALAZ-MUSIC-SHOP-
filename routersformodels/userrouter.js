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
        console.log("Login successful for email:", email);
        return res.status(200).json({ message: "Login successful for " + username, img: pfp});
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


module.exports = router;