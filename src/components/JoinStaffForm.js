import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JoinStaffForm.css'; // Import the CSS file

const BASE_URL = "https://mybackend-2.onrender.com";

const JoinStaffForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    gender: '',
    availability: []
  });
  const [day, setDay] = useState('');
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null); // State to manage errors

  const handleAddDay = () => {
    if (day) {
      setFormData((prevData) => ({
        ...prevData,
        availability: [...prevData.availability, { day, from: '', to: '' }]
      }));
      setDay('');
    }
  };

  const handleRemoveDay = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      availability: prevData.availability.filter((_, i) => i !== index)
    }));
  };

  const handleTimeChange = (index, type, value) => {
    setFormData((prevData) => {
      const newAvailability = [...prevData.availability];
      newAvailability[index][type] = value;
      return { ...prevData, availability: newAvailability };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID');

    

    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const response = await axios.post(
        `${BASE_URL}/staff`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Join staff request failed:', error.message);
      setError('There was an error processing your request. Please try again later.');
    }
  };

  return (
    <div className="join-staff-form-container">
      <h2>Join Our Staff</h2>
      {submitted ? (
        <div className="success-message">
          <p>Thank you! You will hear from us within 1 to 3 days.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} id="join-staff-form">
          <div className="form-group">
            <label htmlFor="role">Select Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="">Select a role</option>
              <option value="Logistics and Operations Team">Help Deliver Books</option>
              <option value="Sales and Marketing Team">Sell Old Books</option>
              <option value="SAcquisition and Inventory Team">Help Secure Books from Bookshop</option>
              <option value="IT and Development Team">Join Our Tech Team</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              required
            >
              <option value="">Select a gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="days">Add Availability:</label>
            <div className="add-day-container">
              <select id="days" name="days" value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Select a day</option>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleAddDay}>Add Day</button>
            </div>
          </div>

          {formData.availability.map((slot, index) => (
            <div className="form-group" key={index}>
              <label>{slot.day}:</label>
              <div className="time-inputs">
                <label htmlFor={`${slot.day}-from`}>From:</label>
                <input
                  type="time"
                  id={`${slot.day}-from`}
                  name={`${slot.day}-from`}
                  value={slot.from}
                  onChange={(e) => handleTimeChange(index, 'from', e.target.value)}
                  required
                />
                <label htmlFor={`${slot.day}-to`}>To:</label>
                <input
                  type="time"
                  id={`${slot.day}-to`}
                  name={`${slot.day}-to`}
                  value={slot.to}
                  onChange={(e) => handleTimeChange(index, 'to', e.target.value)}
                  required
                />
                <button type="button" onClick={() => handleRemoveDay(index)}>Remove</button>
              </div>
            </div>
          ))}

          {error && <div className="error-message">{error}</div>}

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default JoinStaffForm;
