const express = require('express');
const axios = require('axios');
const retry = require('retry');

const router = express.Router();

require('dotenv').config()

router.post('/', async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ success: false, error: 'Keyword is required' });
  }

  const operation = retry.operation({
    retries: 5,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 60000,
  });

  operation.attempt(async () => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          prompt: `Generate 15+ business names for "${keyword}"`,
          // ... other request options
        }
      );

      const names = response.data.candidates.map(candidate => candidate.output);
      res.json({ success: true, names });
    } catch (error) {
      if (operation.retry(error)) {
        console.error('Retrying request due to:', error);
      } else {
        console.error('Failed to fetch data:', error);
        res.status(500).json({ success: false, error: 'Failed to generate names' });
      }
    }
  });
});

module.exports = router;