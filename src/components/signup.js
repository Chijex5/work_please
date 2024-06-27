import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';
import './Signup.css';

const BASE_URL = "https://mybackend-2.onrender.com";

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    matric_no: '',
    password: '',
    
    fullname: '',
    phone: '',
    department: '',
    address: '',
    level: '100'
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [errors, setErrors] = useState({});
  const [stepValid, setStepValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    validateStep();
  }, [formData, currentStep]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const validateStep = () => {
    let stepErrors = {};
    let isValid = true;

    if (currentStep === 0) {
      if (formData.matric_no.length < 11) {
        stepErrors.matric_no = "Matriculation number must be at least 11 characters.";
        isValid = false;
      }
      if (formData.password.length < 8) {
        stepErrors.password = "Password must be at least 8 characters.";
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        stepErrors.confirmPassword = "Passwords do not match.";
        isValid = false;
      }
    } else if (currentStep === 1) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        stepErrors.email = "Please enter a valid email address.";
        isValid = false;
      }
      if (formData.phone.length !== 11) {
        stepErrors.phone = "Phone number must be 11 characters.";
        isValid = false;
      }
    }

    setErrors(stepErrors);
    setStepValid(isValid);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (stepValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/signup`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage({ text: "Registration successful!", type: "success" });
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage({ text: 'Email already exists', type: 'error' });
      } else if (error.response?.status === 410) {
          setMessage({ text: 'Matric No already exists', type: 'error' });
      } else {
        setMessage({ text: error.response?.data?.error || 'Registration failed', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    <StepOne formData={formData} handleInputChange={handleInputChange} errors={errors} handleNext={handleNext} stepValid={stepValid} />,
    <StepTwo formData={formData} handleInputChange={handleInputChange} errors={errors} handleNext={handleNext} handlePrev={handlePrev} stepValid={stepValid} />,
    <StepThree formData={formData} handleInputChange={handleInputChange} handlePrev={handlePrev} handleSubmit={handleSubmit} loading={loading} />
  ];

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h1>Register</h1>
        <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} />
        {message.text && <p className={`message-box ${message.type}`}>{message.text}</p>}
        {steps[currentStep]}
      </form>
    </div>
  );
};

const StepOne = ({ formData, handleInputChange, errors, handleNext, stepValid }) => (
  <>
    <div className="group">
      <label htmlFor="matric_no">Matric Number</label>
      <input type="text" id="matric_no" value={formData.matric_no} onChange={handleInputChange} required className={errors.matric_no ? 'error' : ''} />
      {errors.matric_no && <p className="error-message">{errors.matric_no}</p>}
    </div>
    <div className="group">
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={formData.password} onChange={handleInputChange} required className={errors.password ? 'error' : ''} />
      {errors.password && <p className="error-message">{errors.password}</p>}
    </div>
    <div className="group">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className={errors.confirmPassword ? 'error' : ''} />
      {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
    </div>
    <button onClick={handleNext} className="next-step" disabled={!stepValid}>Next</button>
  </>
);

const StepTwo = ({ formData, handleInputChange, errors, handleNext, handlePrev, stepValid }) => (
  <>
    <div className="group">
      <label htmlFor="fullname">Full Name</label>
      <input type="text" id="fullname" value={formData.fullname} onChange={handleInputChange} required />
    </div>
    <div className="group">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className={errors.email ? 'error' : ''} />
      {errors.email && <p className="error-message">{errors.email}</p>}
    </div>
    <div className="group">
      <label htmlFor="phone">Phone Number</label>
      <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'error' : ''} />
      {errors.phone && <p className="error-message">{errors.phone}</p>}
    </div>
    <button onClick={handlePrev} className="prev-step">Back</button>
    <button onClick={handleNext} className="next-step" disabled={!stepValid}>Next</button>
  </>
);

const StepThree = ({ formData, handleInputChange, handlePrev, handleSubmit, loading }) => (
  <>
    <div className="group">
      <label htmlFor="department">Department</label>
      <input type="text" id="department" value={formData.department} onChange={handleInputChange} />
    </div>
    <div className="group">
      <label htmlFor="address">Address</label>
      <input type="text" id="address" value={formData.address} onChange={handleInputChange} />
    </div>
    <div className="select-wrapper">
      <label htmlFor="level">Select Level:</label>
      <select id="level" value={formData.level} onChange={handleInputChange}>
        <option value="100">100 Level</option>
        <option value="200">200 Level</option>
        <option value="300">300 Level</option>
        <option value="400">400 Level</option>
        <option value="500">500 Level</option>
      </select>
    </div>
    <button onClick={handlePrev} className="prev-step">Back</button>
    <button id="register" type="submit" onClick={handleSubmit} className="next-step" disabled={loading}>
      {loading ? <Loader /> : 'Register'}
    </button>
  </>
);

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const percentage = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default Signup;
