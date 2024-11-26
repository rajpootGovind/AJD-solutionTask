
const express = require("express");

const dotenv = require("dotenv");

const generateRoutes = require("./Routes/route.generate")


dotenv.config();
const app = express();

app.use(express.json())

const PORT = process.env.PORT;

app.use("/api/generate", generateRoutes);


// Start the server
app.listen(PORT, () => {
    // console.log(`get error ${err}`);
    
  console.log(`Server running successfully on port ${PORT}`);
  
});
