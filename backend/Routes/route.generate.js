// const express = require("express"); // Router to handle API endpoints
// const axios = require("axios"); // HTTP client to make requests to external APIs
// const router = express.Router(); // Create a new router instance

// // POST endpoint to generate business names
// router.post("/", async (req, res) => {
//   const { keyword } = req.body; // Extract keyword from the request body

//   // Check if the keyword is provided
//   if (!keyword) {
//     return res.status(400).json({ message: "Keyword is required" }); // Return error if missing
//   }

//   try {
//     // Call Google Gemini API to generate business names
//     const response = await axios.post(
//       "https://generativelanguage.googleapis.com/v1beta2/text:generate", // API endpoint
//       {
//         model: "models/gemini", // Model to use for generation
//         prompt: `Generate 15 creative business names for the industry: ${keyword}`, // Prompt for the API
//         // maxTokens: 150, // Limit on the response size
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, // API key from environment variables
//         },
//       }
//     );

//     // Map the API response to extract the generated business names
//     const businessNames = response.data.candidates.map((candidate) => candidate.text.trim());

//     res.status(200).json({ businessNames }); // Send the names back to the frontend
//   } catch (error) {
//     console.error("Error generating names:", error.message); // Log any error
//     res.status(500).json({ message: "Failed to generate business names" }); // Return error response
//   }
// });

// module.exports = router; // Export the router

const generateController = require("../Controller/generate.controller")

module.exports = (app) =>{
    app.post("/api/generateNames", generateController.generateKeyword)
}