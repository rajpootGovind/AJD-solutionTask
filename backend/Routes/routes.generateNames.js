const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    const { keyword } = req.body;

    try {
        console.log("Before Axios");

        const response = await axios.post(
            'https://generativeai.googleapis.com/v1beta3/models/text:generate',
            {
                prompt: `Generate 15+ business names for "${keyword}"`,
                temperature: 0.7,
                maxOutputTokens: 150,
                topP: 0.9,
                candidateCount: 1
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("After Axios");
        const names = response.data.candidates.map(candidate => candidate.output);
        res.json({ success: true, names });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ success: false, error: 'Failed to generate names' });
    }
});

module.exports = router;
