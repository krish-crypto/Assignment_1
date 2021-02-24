const express = require("express");
const app = express();
const axios = require("axios");
const sharp = require("sharp");
app.get("/image",async(req,res)=>{
    try{
    // Enter the url
    //http://localhost:3000/image?url=https://homepages.cae.wisc.edu/~ece533/images/airplane.png
    const {url} = req.query;
    const image = await axios.get(url,{responseType:'arraybuffer'});
   // Convert image to webp format(loseless compression)
    const data = await sharp(image.data).webp({ lossless: true }).toBuffer();
    // Set the content type
    res.set("Content-Type","image/webp");
    res.status(200).send(data);
    }

    //Handle the error
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Server error"});
    }
})

//Setting up the express server
app.listen(3000,()=>{
    console.log('Server is on port 3000.');
})