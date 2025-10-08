const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const shortURL = require('shorturl')
const validURL = require('valid-url')

const app = express()
app.use(cors())

mongoose.connect("mongodb://localhost:27017/challenge")

const urlSchema = mongoose.Schema(
    {
    ogURL:{
        type:String,
        required:true
    },
    shortenURL:{
        type:String,
        required:true,
        default:
    },
    clicks:{}
}
)


app.get('/shorten',async(req,res)=>{

})

app.post(':/shortCode',async(req,res)=>{

})


module.exports = app
