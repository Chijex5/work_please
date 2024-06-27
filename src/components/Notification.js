import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';

const BASE_URL = "https://mybackend-2.onrender.com";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const response = await axios.get(`${BASE_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="notification-container">
      <div className="notification-header">
        Notifications
        <button className="mark-all-read">Mark all as read</button>
      </div>
      <div className="notification-messages">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-message" onClick={() => handleNotificationClick(notification)}>
            <div className="notification-avatar">
              <img src="https://i.imgur.com/jaC7DxL.jpeg" alt="Avatar" />
            </div>
            <div className="notification-content">
              <div className="notification-sender">{notification.sender}</div>
              <div className="notification-body">{notification.message}</div>
              <div className="notification-time">{new Date(notification.time).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedNotification && (
        <div className="notification-modal">
          <div className="notification-modal-content">
            <span className="notification-modal-close" onClick={handleCloseModal}>&times;</span>
            <div className="notification-modal-header">{selectedNotification.sender}</div>
            <div className="notification-modal-body">{selectedNotification.details}</div>
            <div className="notification-modal-time">{new Date(selectedNotification.time).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
