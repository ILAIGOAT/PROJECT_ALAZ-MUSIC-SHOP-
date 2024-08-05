const mongoose = require('mongoose')/*itamar reem do on terminal 'npm i' command to collect the packages*/
const Schema = mongoose.Schema
const Item = new Schema(
    {
        name:{
            type:String,
            required: true
        },
        script:{
            type:String,
            required: false
        },
        color:{
            type:String,
            required: true
        },
        price:{
            type: mongoose.Types.Decimal128,
            required: true
        },
        instrumenttype:{
            type: String,
            required: true
        },
        img:{
            type:String,
            default: "https://via.placeholder.com/400x400"
        },
        amount:{
            type: Number,
            required: false

        }
    }
)
module.exports = mongoose.model('Item',Item)