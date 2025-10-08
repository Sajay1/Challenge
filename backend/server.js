const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const shortURL = require('shortid')
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
        default:shortURL.generate,
    },
    clicks:{
     type:Number,
     default:0
    },
}
)

const PORT = process.env.PORT || 5000



app.post('/shorten',async(req,res)=>{
    var {longURL} = req.body
    if(!validURL.isUri(longURL)){
       return res.status(500).json("NOT VALID")
    }

})

app.get(':/shortCode',async(req,res)=>{

})

console.log(`Server ruuning on PORT ${PORT}`)

module.exports = app()
