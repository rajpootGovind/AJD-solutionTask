//import react and usestate
import React, { useState } from 'react';

// import serchform component
import InputForm from './componenets/SearchForm';

// import resultgrid component
import ResultsGrid from './componenets/ResultsGrid';

// import axios for making http req
import axios from 'axios';



const App = () => 
  {
    //state to hold results of names and domain
    const [results, setResults] = useState([]);
     
    //Function for handle search process
    const handleSearch = async (keyword) => {
        try {
          //send a post req. to the backend for names
            const { data } = await axios.post('http://localhost:7888/api/generate-names', {keyword });
            const names = data.names;
            
            //send a post req to backend for domain availibility
            const domainResponse = await axios.post('http://localhost:7888/api/check-domains', { names});
              
            // set the result
              setResults(domainResponse.data.availability);
        } 
        // Handling error
        catch (error) 
        {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-5">
             {/* Heading */}
            <h1 className="text-center text-3xl font-bold mb-5">
            Business Name Generator
            </h1>
            
            {/* inputForm component for taking input from user */}
            <InputForm onSearch= {handleSearch} />
             
             {/* resultGrid component for display name and domain availibility */}
            <ResultsGrid results= {results} />
        </div>
    );
};

export default App;
