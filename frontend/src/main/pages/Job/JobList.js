import React, { useState } from "react"; // React

// Components
import JobCard from "./JobCard";

// CSS
import "./css/JobList.css";

// Fake Data
const jobsData = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  logo: `https://picsum.photos/300/300?random=${i + 1}`,
  title: `Job Title ${i + 1}`,
  company: `Company ${i + 1}`,
  location: `Location ${i + 1}`,
  date: `Date ${i + 1}`,
}));

const JobList = () => {
  // State
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Current Page
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const jobs = jobsData.slice(start, end);

  // Max Page
  const maxPage = Math.ceil(jobsData.length / pageSize);

  // Return
  return (
    <div className="joblist-body">
      <div className="joblist-body-container">
        {/* Left */}
        <div className="joblist-list-container">
          {/* Job Cards */}
          <div className="joblist-card-container">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="joblist-card-detail-container">
            HELLO
        </div>
      </div>

      {/* Pagination */}
      <div className="joblist-page-btn-container">
        <button
          className="joblist-page-btn"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev Page
        </button>
        <span>
          {page} / {maxPage}
        </span>
        <button
          className="joblist-page-btn"
          onClick={() => setPage((p) => Math.min(p + 1, maxPage))}
          disabled={page === maxPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

// Export
export default JobList;
