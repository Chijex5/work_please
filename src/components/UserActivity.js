import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoader } from '../LoaderContext';
import './Notification.css';

const BASE_URL = window.location.hostname === 'localhost' ? 'http://127.0.0.1:5000' : 'http://192.168.118.240:5000';

const Notification = () => {
  const { setLoading } = useLoader();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const response = await axios.get(`${BASE_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);

    // Mark notification as read
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${BASE_URL}/notifications/${notification.id}/read`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update local state
      setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="notification-container">
      <div className="notification-header">
        Activities
        
      </div>
      <div className="notification-messages">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-message ${notification.read ? 'read' : ''}`} onClick={() => handleNotificationClick(notification)}>
            
            <div className="notification-content">
              
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
