const mongoose = require('mongoose')/*itamar reem do on terminal 'npm i' command to collect the packages*/
const Schema = mongoose.Schema

const User = new Schema(
    {
        username:{
            type:String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        admin:{
            type: Boolean,
            default: false
        },
        pfp:{
            type: String,
            default: "https://roseanddaisyfoundation.org/media/images/large/pngkey.complaceholderpng3499617.png"
        },
        CreatedAT:{
            type:Date,
            default:Date.now
        },
        UpdatedAT:{
            type:Date,
            default:Date.now
        },
        cart:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ]       
    }
) 

module.exports = mongoose.model('User',User)
