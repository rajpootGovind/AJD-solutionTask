import React, { useState } from 'react'

// functional components for the search form
const SearchForm = ({ onSearch }) => 
    {
        //state management for input
    const [keyword, setKeyword] = useState('')
     
    // Handle for submission
    const handleSubmit = (event) => {
        //add prevent default for submission
        event.preventDefault();
        // for removing spaces
        if (keyword.trim()) {
            onSearch(keyword);
        } else {
            //alert
            alert('Please enter a keyword')
        }
    }

    return (

        // Form element with submit handler
        <form onSubmit={handleSubmit} className="flex justify-center gap-3 mb-5">
            {/* input field for keyword */}
            <input
                type="text"
                placeholder="Enter a keyword or industry"
                value={keyword}
                // update the state on input change
                onChange={(event) => setKeyword(event.target.value)}
                className="p-2 border rounded w-1/2"
            />
            {/* submit button */}
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Generate
            </button>
        </form>
    )
}

export default SearchForm;
