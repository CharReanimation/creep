import React, { useState } from "react"; // React

// Components
import JobCard from "./JobCard";
import JobDetail from "./JobDetail";
import JobFilter from "./JobFilter";

// CSS
import "../../global/css/global_anim.css";
import "../../global/css/global_btn.css";
import "./css/JobList.css";

// Job Types
const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Intern"];

// Fake Data
const jobsData = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  logo: `https://picsum.photos/300/300?random=${i + 1}`,
  title: `Job Title ${i + 1}`,
  company: `Company ${i + 1}`,
  location: `Location ${i + 1}`,
  date: `Date ${i + 1}`,
  desc: `Description ${i + 1}`,
  type: JOB_TYPES[i % JOB_TYPES.length],
}));

// Job List
const JobList = () => {
  // State
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedJob, setSelectedJob] = useState(null); // Job Details
  const [filter, setFilter] = useState({
    query: "",
    jobTypes: [],
  }); // Fliter

  // Filtered Job
  const filteredJobs = jobsData.filter((job) => {
    // Search
    const matchesQuery = filter.query
      ? `${job.title} ${job.company} ${job.location}`
          .toLowerCase()
          .includes(filter.query.toLowerCase())
      : true;

    // Job Type
    const matchesType =
      filter.jobTypes.length > 0 ? filter.jobTypes.includes(job.type) : true;

    return matchesQuery && matchesType;
  });

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
          className="pagination-btn"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev Page
        </button>
        <span className="pagination-info">
          {page} / {maxPage}
        </span>
        <button
          className="pagination-btn"
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
