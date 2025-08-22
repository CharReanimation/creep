import React, { useState } from "react"; // React

// Components

// CSS
import './css/Search.css'

// Search
const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    // Return
    return (
        <div className="search-body">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    🔍
                </button>
            </form>
        </div>
    );
}

// Export
export default Search;