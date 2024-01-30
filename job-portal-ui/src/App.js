import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Signup from './Components/Signup';
import Login from './Components/Login';
//import Logout from './Components/Logout';
import DashBoard from './Components/DashBoard';
import AddJobForm from './Components/AddJobs';
import img from '/Users/ardrans/Downloads/Ardra/jobportal/job-portal-ui/src/images/154027-abstract-blue-and-white-background-design.jpg';


const App = () => {

  const isLoggedIn = localStorage.getItem('token') !== null;

  const headingStyle = {
    fontSize: '2em',
    animation: 'moveFromTop 2s ease-in-out forwards'
  };

  const keyframes = `
    @keyframes moveFromTop {
      0% {
        transform: translateY(-100%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  const animatedBackground = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    animationName: 'example',
    animationDuration: '4s',
    backgroundPosition: 'right bottom, left top',
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat, repeat',
    backgroundSize: 'cover',
    padding: '15px',
};

  return (
   <div>
    <Container>
      <Router>
      <div className="animated-background" style={animatedBackground}>
        <div class="row justify-content-center">
          <style>{keyframes}</style>
          <h1 class="text-center" style={headingStyle}>Welcome to Job Portal App</h1>
          <nav>
          <ul><Link to="/">Login</Link></ul>
            <Routes>

              <Route path="/signup" element={<Signup />}/>
              <Route path="/" element={<Login />}/>
              <Route path="/dashboard" element={<DashBoard />}/>
              <Route path="/addjobs" element={<AddJobForm />}/>

            </Routes>
            </nav>
            </div>
        </div>
      </Router>
    </Container>
   </div>
   
  );
};

export default App;