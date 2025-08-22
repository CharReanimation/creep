import React, { useState } from "react"; // React

// CSS
import "./css/JobFilter.css";
import "../../global/css/global.css";

const JobFilter = ({ onFilter }) => {
  // State
  const [query, setQuery] = useState("");

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(query);
  };

  // Return
  return (
    <div className="jobfilter-body">
      <form className="jobfilter-body-form search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="jobfilter-input search-input"
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
};

// Export
export default JobFilter;
