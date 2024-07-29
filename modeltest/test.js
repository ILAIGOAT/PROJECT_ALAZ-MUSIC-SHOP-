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
        CreatedAT:{
            type:Date,
            default:Date.now
        },
        UpdatedAT:{
            type:Date,
            default:Date.now
        }

    }
) 

module.exports = mongoose.model('User',User)