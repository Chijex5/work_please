import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const BASE_URL = "https://mybackend-2.onrender.com";

function Profile({ onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    phone: '',
    department: '',
    address: '',
    level: '100',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isActiveStaff, setIsActiveStaff] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const auth = localStorage.getItem('auth');
      const token = localStorage.getItem('token');

      if (auth === 'true' && token) {
        try {
          const response = await axios.get(`${BASE_URL}/get-user`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const userData = response.data;
          setFormData({
            email: userData.email,
            fullname: userData.fullname,
            phone: userData.phone,
            department: userData.department,
            address: userData.address,
            level: userData.level.toString(),
            role: userData.role,
          });

          setIsActiveStaff(userData.active === 1);
          localStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
          handleFetchError(error);
        }
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.put(
        `${BASE_URL}/update-profile`,
        {
          user_id: userData.public_id,
          ...formData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setMessage({ text: response.data.message, type: 'success' });
      notifyUser();
      localStorage.setItem('userData', JSON.stringify({ ...userData, ...formData }));
    } catch (error) {
      handleSaveError(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('auth');
    onLogout();
    navigate('/login');
  };

  const notifyUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/create-notification`,
        {
          sender: 'UniBook Exchange',
          message: 'Your profile information has been updated successfully.',
          details: 'You can view your updated profile information in the profile section of our app.',
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error notifying user:', error);
    }
  };

  const handleFetchError = (error) => {
    if (error.response?.status === 406) {
      setMessage({ text: 'Login Timeout. Please sign in', type: 'error' });
      setTimeout(() => {
        onLogout();
        navigate('/login');
      }, 5000);
    } else if (error.response?.status === 404) {
      setMessage({ text: 'User does not exist. Please sign in', type: 'error' });
    } else {
      setMessage({ text: 'Failed to fetch user data', type: 'error' });
    }
  };

  const handleSaveError = (error) => {
    if (error.response?.status === 409) {
      setMessage({ text: 'Email already exists', type: 'error' });
    } else {
      setMessage({ text: 'Profile update failed', type: 'error' });
    }
  };

  return (
    <div className={`profile-section ${isActiveStaff ? 'staff-ui' : 'non-staff-ui'}`}>
      
      <h2>Profile Information</h2>
      {isActiveStaff ? (
          <div className="badge">Proud Member of the {formData.role}</div>
        ) : (
          <div className="badge"></div>
        )}
      {message.text && <p className={`message-box ${message.type}`}>{message.text}</p>}
      <form className="profile-form" onSubmit={handleSave}>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" id="fullname" value={formData.fullname} onChange={handleInputChange} disabled={!isEditing} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={formData.email} disabled />
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} />
        <label htmlFor="department">Department</label>
        <input type="text" id="department" value={formData.department} onChange={handleInputChange} disabled={!isEditing} />
        <label htmlFor="address">Delivery Address</label>
        <textarea id="address" value={formData.address} onChange={handleInputChange} disabled={!isEditing} />
        <label htmlFor="level">Level</label>
        <select id="level" value={formData.level} onChange={handleInputChange} disabled={!isEditing}>
          <option value="100">100 Level</option>
          <option value="200">200 Level</option>
          <option value="300">300 Level</option>
          <option value="400">400 Level</option>
          <option value="500">500 Level</option>
          <option value="600">600 Level</option>
        </select>
        
        {!isEditing && <button type="button" className="edit-button" onClick={handleEdit}>Edit Profile</button>}
        {isEditing && <button type="submit" className="save-button">Save Profile</button>}
      </form>
      <section className="sign-out">
        <h2>Log out</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </section>
    </div>
  );
}

export default Profile;
