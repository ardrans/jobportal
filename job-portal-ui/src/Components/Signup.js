
import React, { useState } from 'react';
import { Container, Navbar, Nav, Jumbotron, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';
import img from '/Users/ardrans/Downloads/Ardra/jobportal/job-portal-ui/src/images/154027-abstract-blue-and-white-background-design.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    usertype: 'job_seeker',
    contact_number: '',
    location: '',
    skills: '',
    resume: null,
    company_name: '',
  });

  const { username, password, confirmPassword, email, usertype, contact_number, location, skills, resume, company_name } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        toast.error("Passwords don't match.");
        return;
    }
    
    const user = {
      username: username,
        password: password,
        email: email,
        usertype: usertype,
        contact_number: contact_number,
        location: location,
        skills: skills,
        resume: resume,
        company_name: company_name,
    };

    try {
        const response = await axios.post(`${config.apiUrl}/api/register/`, user);
        console.log('Registration successful:', response.data);
        history('/login');
    } catch (error) {
      if (error.response && error.response.data.error === 'Email already exists') {
        toast.error('Email already registered with us.');
      } else if (error.response && error.response.status === 500) {
        toast.error('Internal server error');
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
        toast.error('No response received from the server');
      } else {
        console.error('Error during request setup:', error.message);
      }
    }
  };

// const containerStyle = {
//   position: 'relative',
//   overflow: 'hidden',
// };

// const keyframes = `
//     @keyframes example {
//       from { background-color: red; }
//       to { background-color: yellow; }
//     }
//   `;
//   const styleElement = document.createElement('style');
//   styleElement.appendChild(document.createTextNode(keyframes));
//   document.head.appendChild(styleElement);

  return (
    <div className="container mt-5">
          <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <Card style={{width: "500px", perspective:"1000px"}}>
       
        <div className="container mt-5">
        <Card.Header>
      <h2 className="text-center">Signup</h2>
     </Card.Header>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
                <label htmlFor="usertype" className="form-label">
                  User Type
                </label>
                <select
                  className="form-control"
                  id="usertype"
                  name="usertype"
                  value={usertype}
                  onChange={handleChange}
                  required
                >
                  <option value="job_seeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              {usertype === 'job_seeker' && (
                <>
                  <div className="mb-3">
                    <label htmlFor="resume" className="form-label">
                      Resume
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="resume"
                      name="resume"
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {usertype === 'employer' && (
                <>
                  <div className="mb-3">
                    <label htmlFor="company_name" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="company_name"
                      name="company_name"
                      value={company_name}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
        <Card.Footer style={{display: 'flex', justifyContent:'flex-end'}}>
        <button type="submit" className="btn btn-primary">Signup</button>
        </Card.Footer>
      </form>
       </div>
      </Card>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
