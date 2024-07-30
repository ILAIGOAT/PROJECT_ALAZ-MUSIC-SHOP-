const express = require('express');
const User = require('../modeltest/test');
var router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        if(!userExist)
        {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
            username,
            email,
            password: hashedPassword,
            });

            await user.save();
            res.status(201).json(user);
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
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
