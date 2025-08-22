import React from "react"; // React

// CSS
import "./css/JobCard.css";

// Job Card
const JobCard = ({ job, onClick }) => {
  // Return
  return (
    <div className="jobcard-body" onClick={onClick}>
      <img className="jobcard-logo" src={job.logo} alt={job.company} />
      <div className="jobcard-text">
        <h3 className="jobcard-h3">{job.title}</h3>
        <div className="jobcard-details">
          <p className="jobcard-company">{job.company}</p>
          <p className="jobcard-location">{job.location}</p>
          <p className="jobcard-date">{job.date}</p>
        </div>
      </div>
    </div>
  );
};

// Export
export default JobCard;
