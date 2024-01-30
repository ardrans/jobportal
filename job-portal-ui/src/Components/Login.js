import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';



const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const { username, password } = formData;
  const history = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem('token', token);
    console.log(token);
    setLoggedIn(true);
    history('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.apiUrl}/api/login/`, formData);
      console.log('Login successful:', response);
      console.log(response.data.access_token);
      storeToken(response.data.access_token);
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.data) {
        if (error.response.data.non_field_errors) {
          toast.error(error.response.data.non_field_errors[0]);
        } else {
          toast.error('An error occurred while logging in.');
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h2 className="text-center">Login</h2>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Login
                    </Button>
                  </Form>
                </Col>
                <Col>
                  <div className="text-center">
                    <h2>Welcome!</h2>
                    <p>Please login to access your account.</p>
                  </div>
                </Col>
              </Row>
              <div className="mt-3 text-center">
                <Link to="/signup">Don't have an account? Sign up</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Login;
