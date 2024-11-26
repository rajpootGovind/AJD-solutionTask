const { GoogleGenerativeAI } = require ("@google/generative-ai");
 const express = require("express")
 const bodyParser = require ("body-parser")

 require("dotenv").config()
 const app = express()

 app.use(express.json())
 app.use(bodyParser.json())

 const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "How are you.";
const generate = async (keyword) => {
    try{
        const result = await model.generateContent(`generate 15+ word related to keyword or industry ${keyword} `);
        console.log(result.response.text());
         return result.response.text()

    }catch(err){
        console.log("error"+ err);
        
    }
}

 exports.generateKeyword= async(req, res) => {
//  res.send("hello world Gemini")
  try{
    const keyword = req.body.keyword
    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
      }
    const result = await generate(keyword)
    res.send({
        result : result
    })
    

    // const businessNames = result.data.candidates.map((candidate) => candidate.text.trim());

    // res.status(200).json({ businessNames }); // Send the names back to the frontend
    
    }catch (error) {
        console.error("Error generating names:", error.message); // Log any error
        res.status(500).json({ message: "Failed to generate business names" }); // Return error response
      }


   
  } 
 