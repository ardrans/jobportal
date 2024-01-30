import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Card, Form, Button, Container } from 'react-bootstrap';

const AddJobForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');

  const token = localStorage.getItem('token');


  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
        let apiUrl = `${config.apiUrl}/api/add_jobs/`;

        const response = await axios.post(
            apiUrl,
            {
              job_title: jobTitle,
              job_description: jobDescription,
              location: location,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );

     
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error adding job:', error);
      // Handle error
    }
  };

  return (
    <Container className="mt-5">
    <Card>
      <Card.Body>
        <Form onSubmit={handleJobSubmit}>
          <Form.Group controlId="jobTitle">
            <Form.Label>Job Title:</Form.Label>
            <Form.Control
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="jobDescription">
            <Form.Label>Job Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location:</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Card.Footer>
          <Button variant="primary" type="submit">
            Add Job
          </Button>
          </Card.Footer>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  );
};

export default AddJobForm;
