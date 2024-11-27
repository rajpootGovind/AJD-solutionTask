const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config()

router.post('/', async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ success: false, error: 'Domain is required' });
  }

  try {
    // WhoisXML API URL
    const apiUrl = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${process.env.WHOISXML_API_KEY}&domainName=${domain}`;

    const response = await axios.get(apiUrl);

    // Extracting availability status
    const isAvailable = response.data.DomainInfo.domainAvailability === 'AVAILABLE';

    res.json({ success: true, domain, available: isAvailable });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to check domain availability' });
  }
});

module.exports = router;
