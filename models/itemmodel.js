const mongoose = require('mongoose')/*itamar reem do on terminal 'npm i' command to collect the packages*/
const Schema = mongoose.Schema
const Item = new Schema(
    {
        itemname:{
            type:String,
            required: true
        },
        itemscript:{
            type:String,
            required: false
        },
        itemcolor:{
            type:String,
            required: true
        },
        itemprice:{
            type: mongoose.Types.Decimal128,
            required: true
        },
        itemimg:{
            type:String,
            default: "https://via.placeholder.com/400x400"
        }
    }
)
module.exports = mongoose.model('Item',Item)