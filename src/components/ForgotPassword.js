import axios from 'axios';
import React, { useState } from 'react';
import './ForgotPassword.css'; // Assuming you have a CSS file for styling

const ForgotPassword = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!registrationNumber.trim()) {
      setErrorMessage('Registration number is required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/forgot-password", {
        matric_no: registrationNumber // Ensure the key matches your backend
      });
      setSuccessMessage('Password reset email sent successfully!');
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        if (error.response.status === 404) {
          setErrorMessage('User not found!');
        } else if (error.response.status === 500) {
          setErrorMessage('Server error. Please try again later.');
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        setErrorMessage('Error: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="forgot" className="forgot">
      <form id="forgot-form" onSubmit={handleForgotPassword}>
        <h1>Reset Password</h1>
        <div className="group">
          <label htmlFor="regno3">Registration Number</label>
          <input
            type="text"
            id="regno3"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : 'Submit'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </section>
  );
};

export default ForgotPassword;
