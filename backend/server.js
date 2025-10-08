const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const shortURL = require('shortid')
const validURL = require('valid-url')

const app = express()
app.use(cors())
app.use(bodyparser.json())

mongoose.connect("mongodb://localhost:27017/challenge")

const urlSchema =  mongoose.Schema(
    {
    ogURL:{
        type:String,
        required:true
    },
    shortCode:{
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

const URL = mongoose.model("URL",urlSchema)

const PORT = process.env.PORT || 5000



app.post('/api/shorten',async(req,res)=>{
    
    try{
        const { ogURL } = req.body;
    if(!validURL.isUri(ogURL)){
       return res.status(400).json("NOT VALID")
    }

    let url = await URL.findOne({ogURL})
    if(url){
       return res.json(url)
    }

    url = new URL({ogURL})
    await url.save()

    res.json({
        ogURL:url.ogURL,
        shortCode:url.shortCode,
        shortURL:`${req.protocol}://${req.get('host')}/${url.shortCode}`
    })

}
    catch(error){
        console.error(error)
        return res.status(500).json("SERVER ERROR")
    }

})


app.get('/api/:shortCode',async(req,res)=>{

     try {
    const { shortCode } = req.params;

    const url = await URL.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.ogURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

})



app.get('/api/urls/all', async (req, res) => {
  try {
    const urls = await URL.find().sort();
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

});


app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})


module.exports = app