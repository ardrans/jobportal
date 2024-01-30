import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { Card, Form } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './JobLists.css'; // Import the CSS file for additional styling

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let apiUrl = `${config.apiUrl}/api/list_jobs/`;

        const params = new URLSearchParams();
        if (searchTitle) {
          params.append('title', searchTitle);
        }
        if (searchLocation) {
          params.append('location', searchLocation);
        }

        if (params.toString()) {
          apiUrl += `?${params.toString()}`;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [searchTitle, searchLocation, token]);

  const handleTitleSearchChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleLocationSearchChange = (event) => {
    setSearchLocation(event.target.value);
  };

  return (
    <div className="job-list-container">
      <h1>Job Listings</h1>
      <div className="search-container">
        <Form.Control
          type="text"
          placeholder="Search by job title"
          value={searchTitle}
          onChange={handleTitleSearchChange}
        />
        <Form.Control
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={handleLocationSearchChange}
        />
      </div>
      <div className="card-container">
        {jobs.map((job) => (
          <Card key={job.id} className="job-card">
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {job.description}
              </Card.Text>
              <Card.Text>
                <FaMapMarkerAlt /> {job.location}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobList;
