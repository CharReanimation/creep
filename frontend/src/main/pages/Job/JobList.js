import React, { useState } from "react"; // React

// Components
import JobCard from "./JobCard";
import JobDetail from "./JobDetail";
import JobFilter from "./JobFilter";

// CSS
import "../../global/css/global_anim.css"
import "./css/JobList.css";

// Fake Data
const jobsData = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  logo: `https://picsum.photos/300/300?random=${i + 1}`,
  title: `Job Title ${i + 1}`,
  company: `Company ${i + 1}`,
  location: `Location ${i + 1}`,
  date: `Date ${i + 1}`,
  desc: `Description ${i + 1}`,
}));

const JobList = () => {
  // State
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedJob, setSelectedJob] = useState(null); // Job Details
  const [filter, setFilter] = useState(""); // Fliter

  // Filtered Job
  const filteredJobs = jobsData.filter((job) =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  // Current Page
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const jobs = filteredJobs.slice(start, end);
  const maxPage = Math.ceil(filteredJobs.length / pageSize); // Max

  // Return
  return (
    <div className="joblist-body">
      {/* Search */}
      <div className="joblist-body-search anim-scale-in">
        <JobFilter onFilter={setFilter} />
      </div>
      <div className="joblist-body-container">
        {/* Left */}
        <div className="joblist-list-container">
          {/* Job Cards */}
          <div className="joblist-card-container anim-left-to-right">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => setSelectedJob(job)}
              />
            ))}
            {jobs.length === 0 && <div>NO JOBS FOUND!</div>}
          </div>
        </div>
        {/* Right */}
        <div className="joblist-card-detail-container anim-right-to-left">
          <JobDetail job={selectedJob} />
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
