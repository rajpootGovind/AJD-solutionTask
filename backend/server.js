
const express = require("express");

const dotenv = require("dotenv");




dotenv.config();
const app = express();

app.use(express.json())

const PORT = process.env.PORT;




// Start the server
app.listen(PORT, () => {
    // console.log(`get error ${err}`);
    
  console.log(`Server running successfully on port ${PORT}`);
  
});
