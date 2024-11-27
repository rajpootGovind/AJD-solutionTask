import React, { useState } from 'react'

const SearchForm = ({ onSearch }) => 
    {
    const [keyword, setKeyword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        if (keyword.trim()) {
            onSearch(keyword);
        } else {
            alert('Please enter a keyword')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center gap-3 mb-5">
            <input
                type="text"
                placeholder="Enter a keyword or industry"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className="p-2 border rounded w-1/2"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Generate
            </button>
        </form>
    )
}

export default SearchForm;
