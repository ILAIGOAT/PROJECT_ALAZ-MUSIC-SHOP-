const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://MSalaz:NbfQnrVeMrM1fUAd@musicshop.0dbqnnb.mongodb.net/MusicShopDataBase');
const User = require('../routersformodels/userrouter');
const Item = require('../routersformodels/itemrouter');


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use('/user',User);
app.use('/item',Item);


mongoose.connection.once('open', () => {
    console.log('ServerStarted');
    app.listen(88);
    
})