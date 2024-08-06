const mongoose = require('mongoose')/*itamar reem do on terminal 'npm i' command to collect the packages*/
const Schema = mongoose.Schema
const Order = new Schema(
    {
        date:{
            type:Date,
            default:Date.now
        },
        address:{
            type: String,
            required: true
        },
        cart:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ],
        cartAmounts:[
        {
            type: Number,
            default: false
        }
        ],
        totalprice:
        {
            type: Number,
            required: true
        },
        useremail:{
            type: String,
            required: true
        }      
    }
)

module.exports = mongoose.model('Order',Order)