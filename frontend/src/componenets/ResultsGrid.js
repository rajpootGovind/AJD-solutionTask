import React from 'react';

// functinal component for display res in table format
const ResultsGrid = ({ results }) => 
    {
    if (!results.length) return null

    return (
        //define table
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">Business Name</th>
                   <th className="p-2 border">Domain Available</th>
                </tr>
            </thead>
            <tbody>

                {/* itearte the results array */}
                {results.map((result, index) => (
                    <tr key={index} className="text-center">
                         <td className="p-2 border">{result.name}</td>
                         {/**display availability available or not available */}
                        <td className="p-2 border">{result.available ? 'Available': 'Not Available'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ResultsGrid
