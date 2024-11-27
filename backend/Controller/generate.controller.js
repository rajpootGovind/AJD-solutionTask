// const axios = require('axios');

// // Function to call the Google Gemini API to generate business names
// const generateBusinessNames = async (keyword) => {
//   try {
//     const response = await axios.post('https://api.google.com/gemini/generate-names', {
//       keyword: keyword,
//       count: 15
//     }, {
//       headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` }
//     });
   
    
//     return response.data.names;  // Assuming Gemini returns names in `names` field
//   } catch (error) {
//     console.error('Error generating names:', error);
//     // throw new Error('Could not generate names');
//   }
// };

// // Function to check domain availability using WhoisXML API
// const checkDomainAvailability = async (name) => {
//   try {
//     const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService`, {
//       params: {
//         apiKey: process.env.WHOISXML_API_KEY,
//         domainName: `${name}.com`,
//         outputFormat: 'JSON'
//       }
//     });

//     // The WhoisXML API returns the status in the "WhoisRecord" field. If the domain is available, the status will be "AVAILABLE"
//     const domainStatus = response.data.WhoisRecord.domainName;
//     return !domainStatus;  // If no Whois record is found, the domain is available
//   } catch (error) {
//     console.error('Error checking domain availability:', error);
//     //throw new Error('Could not check domain availability');
//   }
// };

// // Controller function to handle the /generate-names route
// const generateNames = async (req, res) => {
//   const { keyword } = req.body;

//   if (!keyword) {
//     return res.status(400).json({ error: 'Keyword is required' });
//   }

//   try {
//     // Generate business names using Google Gemini
//     const names = await generateBusinessNames(keyword);

//     const namesWithAvailability = [];

//     // Check the availability of the .com domain for each name
//     for (const name of names) {
//       const isAvailable = await checkDomainAvailability(name);
//       namesWithAvailability.push({ name, isAvailable });
//     }

//     // Return the names and domain availability status
//     return res.json({ names: namesWithAvailability });
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to generate names or check domain availability' });
//   }
// };

// module.exports = { generateNames };
