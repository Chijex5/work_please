import React, { useState } from 'react';
import useForm from './useForm';
import './style.css';
import 'boxicons/css/boxicons.min.css';

const AcademicHub = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loginValues, handleLoginChange] = useForm({ username: '', password: '' });
  const [registerValues, handleRegisterChange] = useForm({
    regno: '', password: '', fullname: '', email: '', phone: '', department: '', address: ''
  });

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowForgot(false);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowForgot(false);
    setCurrentStep(0);
  };

  const handleForgotClick = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowForgot(true);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Handle login logic
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic
  };

  return (
    <div className="container">
      <h1 className="welcome-message">
        <strong>Welcome to</strong> <span><p>Academic Hub</p></span>
      </h1>
      <div className="homepage-content">
        <p>Prepare for your academic adventure!</p>
        <p>Access your learning resources by signing in.</p>
        <p>Start exploring and expanding your knowledge!</p>
      </div>
      <div className="login-signup">
        <button className="register-link1" onClick={handleLoginClick}>Login</button>
        <button className="register-link" onClick={handleRegisterClick}>Sign Up</button>
      </div>

      {showLogin && (
        <section id="login1" className="login">
          <form id="loginForm" onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <div>
              <label>Username</label>
              <input type="text" id="username" name="username" value={loginValues.username} onChange={handleLoginChange} />
            </div>
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <div className="password-container1">
                <input type={passwordVisible ? "text" : "password"} id="password" name="password" value={loginValues.password} onChange={handleLoginChange} />
                <div className="password-controls">
                  <input type="checkbox" className="password-checkbox" id="showPasswordCheckbox" onChange={togglePasswordVisibility} /> 
                  <label htmlFor="showPasswordCheckbox">Show password</label>
                </div>
              </div>
            </div>
            <button className="idi" type="submit">Login</button>
            <p><a href="#forgot" className="register-link2" onClick={handleForgotClick}> Forgot Password</a></p>
          </form>
        </section>
      )}

      {showRegister && (
        <section id="register" className="register">
          <form id="registerForm" onSubmit={handleRegisterSubmit}>
            <h1>Register</h1>
            {currentStep === 0 && (
              <div className="step" id="step1">
                <div className="group">
                  <label htmlFor="regno">Registration Number</label>
                  <input type="text" id="regno" name="regno" value={registerValues.regno} onChange={handleRegisterChange} required />
                </div>
                <div className="group">
                  <label htmlFor="password">Password</label>
                  <div className="input-with-icon">
                    <input type={passwordVisible ? "text" : "password"} id="password1" name="password" value={registerValues.password} onChange={handleRegisterChange} style={{ paddingRight: '40px' }} />
                    <div className="password-controls">
                      <input type="checkbox" className="password-checkbox" id="showPasswordCheckbox1" onChange={togglePasswordVisibility} /> 
                      <label htmlFor="showPasswordCheckbox1">Show password</label>
                    </div>
                  </div>
                </div>
                <button id="steb1" className="next-step" type="button" onClick={handleNextStep}>Next</button>
              </div>
            )}
            {currentStep === 1 && (
              <div className="step" id="step2">
                <div className="group">
                  <label htmlFor="fullname">Full Name</label>
                  <input type="text" id="fullname" name="fullname" value={registerValues.fullname} onChange={handleRegisterChange} required />
                </div>
                <div className="group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={registerValues.email} onChange={handleRegisterChange} required />
                </div>
                <div className="group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={registerValues.phone} onChange={handleRegisterChange} />
                </div>
                <button id="prev2" className="prev-step" type="button" onClick={handlePrevStep}>Back</button>
                <button id="steb2" className="next-step" type="button" onClick={handleNextStep}>Next</button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="step" id="step3">
                <div className="group">
                  <label htmlFor="department">Department</label>
                  <input type="text" id="department" name="department" value={registerValues.department} onChange={handleRegisterChange} />
                </div>
                <div className="group">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" name="address" value={registerValues.address} onChange={handleRegisterChange} />
                </div>
                <button id="prev3" className="prev-step" type="button" onClick={handlePrevStep}>Back</button>
                <button type="submit" id="reg1">Register</button>
              </div>
            )}
          </form>
        </section>
      )}

      {showForgot && (
        <section id="forgot" className="forgot">
          <form id="forgot-form">
            <h1>Reset Password</h1>
            <div className="group">
              <label htmlFor="regno">Registration Number</label>
              <input type="text" id="regno3" name="regno3" value={registerValues.regno} onChange={handleRegisterChange} required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      )}

      <section className="homepage2">
        <footer className="footer-bar">
          <div className="footer-content">
            <p>Satisfied users <span id="satisfiedCount">0</span> Trusted by <span id="trustedCount">0</span> Active hrs/day <span id="activeHoursCount">0</span>Hrs</p>
          </div>
        </footer>
      </section>

      <div id="message-container" className="message-container"></div>
    </div>
  );
};

export default AcademicHub;
