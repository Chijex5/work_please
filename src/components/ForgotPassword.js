import React from 'react';
import './ForgotPassword.css'; // Assuming you have a CSS file for styling

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending a reset password request
    // You can access form values using state or directly from the DOM
    const registrationNumber = document.getElementById('regno3').value;
    console.log('Submitting forgot password form with registration number:', registrationNumber);
    // Add further logic as needed (e.g., API calls for password reset)
  };

  return (
    <section id="forgot" className="forgot">
      <form id="forgot-form" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <div className="group">
          <label htmlFor="regno">Registration Number</label>
          <input type="text" id="regno3" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default ForgotPassword;
