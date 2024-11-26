const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios"); // Import axios for making domain check API calls

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate business names based on the industry/keyword
const generate = async (keyword) => {
    try {
        const result = await model.generateContent(`generate 15+ words related to keyword or industry ${keyword}`);
        return result.response.text().split("\n"); // Assuming names are separated by newlines
    } catch (err) {
        console.log("Error generating names: " + err);
    }
};

// Function to check domain availability using Domainr API
const checkDomainAvailability = async (name) => {
    const domain = `${name}.com`; // Assuming .com is the domain extension to check
    const apiKey = process.env.DOMAIN_API_KEY; // Store your Domainr API key in environment variables

    try {
        const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService`);
        const status = response.data.status[0]; // Domain status response
        const isAvailable = status.code === "AVAILABLE"; // Check if domain is available
        return isAvailable;
    } catch (error) {
        console.error("Error checking domain availability:", error);
        return false; // Return false in case of any error
    }
};

// Endpoint to generate business names and check domain availability
exports.generateKeyword = async (req, res) => {
    try {
        const keyword = req.body.keyword;
        if (!keyword) {
            return res.status(400).json({ message: "Keyword is required" });
        }

        // Generate business names based on the keyword
        const generatedNames = await generate(keyword);

        // Check domain availability for each generated name
        const namesWithAvailability = [];
        for (const name of generatedNames) {
            const isAvailable = await checkDomainAvailability(name.trim()); // Check availability for each name
            namesWithAvailability.push({
                businessName: name.trim(),
                isAvailable: isAvailable ? "Available" : "Not Available",
            });
        }

        // Send the results back to the frontend
        res.status(200).json({ result: namesWithAvailability });
    } catch (error) {
        console.error("Error generating names or checking domains:", error.message);
        res.status(500).json({ message: "Failed to generate business names or check domain availability" });
    }
};

// Example Express route to trigger keyword generation and domain check
// app.post("/api/generate-names", exports.generateKeyword);

// app.listen(5000, () => {
//     console.log("Server is running on http://localhost:5000");
// });
