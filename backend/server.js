const express = require('express');
const cors = require('cors');
require('dotenv').config();

const generateNamesRoute = require('./Routes/routes.generateNames');
const checkDomainsRoute = require('./Routes/route.checkDomains');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/generate-names', generateNamesRoute);
app.use('/api/check-domains', checkDomainsRoute);

const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
