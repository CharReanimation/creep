import React from "react"; // React

// CSS
import "./css/JobDetail.css";

// Job Detail
const JobDetail = ({ job }) => {
  if (!job) {
    return <div className="jobdetail-empty">Please Select a Job</div>;
  }

  // Return
  return (
    <div className="jobdetail-body">
      <img className="jobdetail-logo" src={job.logo} alt={job.company} />
      <h2>{job.title}</h2>
      <p><strong>Job Type: </strong>{job.type}</p>
      <p><strong>Company: </strong>{job.company}</p>
      <p><strong>Location: </strong>{job.location}</p>
      <p><strong>Release Date: </strong>{job.date}</p>
      <div className="jobdetail-description">
        {job.desc}
      </div>
    </div>
  );
};

// Export
export default JobDetail;
