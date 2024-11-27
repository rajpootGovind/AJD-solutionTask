import React, { useState } from 'react';
import InputForm from './componenets/SearchForm';
import ResultsGrid from './componenets/ResultsGrid';
import axios from 'axios';

const App = () => {
    const [results, setResults] = useState([]);

    const handleSearch = async (keyword) => {
        try {
            const { data } = await axios.post('http://localhost:7888/api/generate-names', { keyword });
            const names = data.names;

            const domainResponse = await axios.post('http://localhost:7888/api/check-domains', { names });
            setResults(domainResponse.data.availability);
        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="text-center text-3xl font-bold mb-5">Business Name Generator</h1>
            <InputForm onSearch={handleSearch} />
            <ResultsGrid results={results} />
        </div>
    );
};

export default App;
