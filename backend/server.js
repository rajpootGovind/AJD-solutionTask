// import express framework
const express = require('express');

// import cors middleware for cross origin resourrce sharing
const cors = require('cors');

////load env variables
require('dotenv').config();


// imports routes
const generateNamesRoute = require('./Routes/routes.generateNames');
const checkDomainsRoute = require('./Routes/route.checkDomains');

// create a express app instance
const app = express();

//enable CORS for allow request to another origin
app.use(cors());

// for prasing incoming json
app.use(express.json());

// Define route for api endpoints
app.use('/api/generate-names', generateNamesRoute);
app.use('/api/check-domains', checkDomainsRoute);

const PORT = process.env.PORT 

// start the server
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
