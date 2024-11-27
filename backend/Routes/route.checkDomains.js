const express = require('express');
const axios = require('axios');

//for creating new express router
const router = express.Router();

//loading env variables
require('dotenv').config()

//A post route for doamin availability
router.post('/', async (req, res) => {

    //Domain from req.body
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ success: false, error: 'Domain is required' });
  }

  try {
    // construct WhoisXML API URL
    const apiUrl = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${process.env.WHOISXML_API_KEY}&domainName=${domain}`;

    const response = await axios.get(apiUrl);

    // Extracting availability status
    const isAvailable = response.data.DomainInfo.domainAvailability === 'AVAILABLE';

   //Success, we get doamin and doamin avaialbility
    res.json({ success: true, domain, available: isAvailable });
  } 
  
  /// for handling Error
  catch (error) {
    console.error(`we get error in domain availability ${error}`);
    res.status(500).json({ success: false, error: 'Failed to check domain availability' });
  }
});

/// export the routes so we can it another place
module.exports = router;
