const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/MusicShop');
const User = require('../routertest/testrouter');


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use('/user',User)



mongoose.connection.once('open', () => {
    console.log('ServerStarted');
    app.listen(88);//88
})