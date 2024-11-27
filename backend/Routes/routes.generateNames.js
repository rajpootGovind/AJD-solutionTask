const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    const { keyword } = req.body;

    try {
        console.log("befor axious");
        
        const response = 
        await axios.post('https://generativeai.googleapis.com/v1beta3/models/text:generate', {
            prompt: `Generate 15+ business names for "${keyword}"`,
            
        }, {
            headers: {
                Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("after axios");
        
        const names = response.data; // Replace with actual API response structure
        res.json({ success: true, names });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to generate names' });
    }
});

module.exports = router;


// app.get('/api/generate-names', async (req, res) => {
//     const { industry } = req.body;
//     if (!industry) return res.status(400).send("Industry/keyword is required");
  
//     try {
//       // Call Google Gemini API for name generation
//       const generatedNames = await generateNames(industry);
      
     
//     } catch (error) {
//       res.status(500).send('Error generating names or checking domains');
//     }
//   });
  
//   // Function to call the Google Gemini API
//   const generateNames = async (industry) => {
//     // Make the API call to Google Gemini API (replace with the actual endpoint)
//     const response = await axios.post('https://api.google.com/gemini', {
//       industry: industry,
//       numResults: 15
//     });
    
//     return response.data.names; // assuming this returns an array of names
//   };
  
