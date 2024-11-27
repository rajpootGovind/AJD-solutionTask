import React from 'react';

const ResultsGrid = ({ results }) => {
    if (!results.length) return null;

    return (
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">Business Name</th>
                    <th className="p-2 border">Domain Available</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, idx) => (
                    <tr key={idx} className="text-center">
                        <td className="p-2 border">{result.name}</td>
                        <td className="p-2 border">{result.available ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ResultsGrid;
