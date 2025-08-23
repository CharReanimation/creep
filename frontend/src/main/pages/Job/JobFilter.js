import React, { useState, useRef } from "react"; // React
import { createPortal } from "react-dom";

// CSS
import "./css/JobFilter.css";
import "../../global/css/global.css";

// Job Types
const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Intern"];

const JobFilter = ({ onFilter }) => {
  // State
  const [query, setQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  // Toggle Job Type
  const toggleType = (type) => {
    setSelectedTypes(
      (prev) =>
        prev.includes(type)
          ? prev.filter((t) => t !== type) // Cancel
          : [...prev, type] // Add
    );
  };

  // Handle Toggle Menu
    const handleToggleMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setMenuOpen((prev) => !prev);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ query, jobTypes: selectedTypes });
  };

  // Return
  return (
    <div className="jobfilter-body">
      {/* Search Form */}
      <form className="jobfilter-body-form search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="jobfilter-input search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Dropdown */}
        <div className="jobfilter-dropdown">
          <button
            type="button"
            ref={buttonRef}
            className="jobfilter-dropdown-toggle"
            onClick={handleToggleMenu}
          >
            {selectedTypes.length > 0
              ? `Job Types (${selectedTypes.length}) ⏷`
              : "Job Types ⏷"}
          </button>

          {/* Tag Filter */}
          {menuOpen &&
            createPortal(
              <div
                className="jobfilter-dropdown-menu"
                style={{
                  top: menuPos.top,
                  left: menuPos.left,
                  position: "absolute",
                }}
              >
                {JOB_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`jobfilter-dropdown-item ${
                      selectedTypes.includes(type) ? "selected" : ""
                    }`}
                    onClick={() => toggleType(type)}
                  >
                    {selectedTypes.includes(type) ? "✔ " : ""} {type}
                  </button>
                ))}
              </div>,
              document.body
            )}
        </div>

        {/* Submit */}
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
    </div>
  );
};

// Export
export default JobFilter;
