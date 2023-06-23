"use client";

import React, { useState } from "react";
import jobsData from "../pages/jobs.json";
import "../styles/jobs.css";
import Image from "next/image";

const JobsPage = () => {
  const [searchTerms, setSearchTerms] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const handleSearch = () => {
    if (currentSearchTerm.trim() !== "") {
      setSearchTerms([...searchTerms, currentSearchTerm.trim()]);
      setCurrentSearchTerm("");
    }
  };

  const handleRemoveSearchTerm = (term) => {
    setSearchTerms(searchTerms.filter((t) => t !== term));
  };

  const handleInputChange = (e) => {
    setCurrentSearchTerm(e.target.value);
  };

  const filteredJobs = jobsData.filter((job) =>
    searchTerms.every((searchTerm) =>
      job.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  return (
    <div class="body-container">
      <div class="container">
        <div class="search-bar">
          <div class="search-terms">
            {searchTerms.map((term, index) => (
              <span key={index} class="search-term search-container">
                {term}
                <button
                  class="button x-button"
                  onClick={() => handleRemoveSearchTerm(term)}
                >
                  x
                </button>
              </span>
            ))}
            <input
              class="search-input"
              type="text"
              placeholder="Search"
              value={currentSearchTerm}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button class="add-button" onClick={handleSearch}>
              Add
            </button>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div class="jobs-list">
            {filteredJobs.map((job, index) => (
              <div class="job-item" key={index}>
                <div>
                  <h2 class="job-title">{job.position}</h2>
                  <p class="company-info">Company: {job.company}</p>
                  <p class="company-info">Location: {job.location}</p>
                  <p class="company-info">
                    Keywords: {job.keywords.join(", ")}
                  </p>
                </div>
                <Image
                  className="company-logo"
                  src={job.company_logo}
                  alt={job.company}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        ) : (
          <p class="no-jobs">No job openings found.</p>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
