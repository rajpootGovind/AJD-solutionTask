const express = require('express');

//axios for making http req
const axios = require('axios');

//for creating router
const router = express.Router();

//load env variables
require("dotenv").config()



//post route to generate business names
router.post('/', async (req, res) => {
    //get keyword from req body
    const { keyword } = req.body;
    if (!keyword) {
        return res.status(400).json({ success: false, error: 'Keyword is required' });
      }

    try {
        console.log("Before Axios");

        // sending a post to gemini api for getting names
        const response = await axios.post(
            'https://generativeai.googleapis.com/v1beta3/models/text:generate',
            {
                //promt to generate business names
                prompt: `Generate 15+ business names for "${keyword}"`,
               
            },
            {
                headers: {
                    //specify key and type of content
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("After Axios");

        //Get names from api res
        const names = response.data.candidates.map(candidate => candidate.output);
        //send res as a json formt
        res.json({ success: true, names });

    } 
    //for error handling
    catch (error) {
        // will retun internal server error
        console.error(`error during generating names ${error}`);
        res.status(500).json({ success: false, error: 'Failed to generate names' });
    }
});

// export the router for use in other place like main application
module.exports = router;
