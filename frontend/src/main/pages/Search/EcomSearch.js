import React, { useState } from "react";

// API
import { searchEcom } from "../../../API/API_SEARCH";

// Components
import Search from "./Search";

// Ecom Search Page
const EcomSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle Search
    const handleSearch = async (query) => {
        try {
            setLoading(true);
            setError(null);
            const data = await searchEcom(query);
            setResults(data); 
        } catch (err) {
            console.error("Search Failed: ", err);
            setError("Search Error");
        } finally {
            setLoading(false);
        }
    };

    // Return
    return (
        <div>
            {/* Search */}
            <Search onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/* Results */}
            <ul>
                {results.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li> //
                ))}
            </ul>
        </div>
    );
};

// Export
export default EcomSearch;
