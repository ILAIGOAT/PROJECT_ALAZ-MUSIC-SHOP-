const express = require('express');
const User = require('../modeltest/test');
var router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req,res) => {
const { username , email , password} = req.body;
const saltrounds = 10;
var hashedpassword = await bcrypt.hash(password,10);
const user = new User({
    username,
    email,
    password: hashedpassword,

})
await user.save();
res.status(201).json(user);
})

module.exports = router;
