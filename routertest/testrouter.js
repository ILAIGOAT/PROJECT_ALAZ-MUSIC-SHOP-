const express = require('express');
const User = require('../modeltest/test');
var router = express.Router();
const bcrypt = require('bcrypt');
//fix an error ocured during registeration


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

        console.log("Login successful for email:", email);
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;


/*router.post('/register', async (req,res) => {
const { username , email , password} = req.body;
const saltrounds = 10;
var hashedpassword = await bcrypt.hash(password,10);

const userExist = await User.findOne({ email: email });
        if (userExist)
        {
             return res
          .status(422)
          .json({ error: "Email already exists" });
        }

const user = new User({
    username,
    email,
    password: hashedpassword,

})
await user.save();
res.status(201).json(user);
})




module.exports = router;*/
