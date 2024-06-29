import React, { useState } from 'react';
import axios from 'axios';
import './NotifyMeButton.css';

const BASE_URL = "https://mybackend-2.onrender.com";

const NotifyMeButton = ({ book, handleNotifyMe }) => {
  const [loading, setLoading] = useState(false);
  const [notified, setNotified] = useState(false);
  const [message, setMessage] = useState('');

  const notifyUser = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      setLoading(true);
      await axios.post(
        `${BASE_URL}/create-notification`,
        {
          bookId: book.code,
          message: `Update on book: ${book.title}`,
          sender: "UniBooks",
          details: `You have been notified about the availability of the book: ${book.title}. A message will be sent to your mail once it is available.`
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      handleNotifyMe(book); // Call the parent component's handler
      setLoading(false);
      setNotified(true);
      setMessage('You will be notified once the book becomes available.');
    } catch (error) {
      console.error('Error notifying user:', error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (!loading && !notified) {
      notifyUser();
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`notify-me-button ${loading || notified ? 'disabled' : ''}`}
        disabled={loading || notified}
      >
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          notified ? 'Notified' : 'Notify Me'
        )}
      </button>
      {message && <p className="notification-message">{message}</p>}
    </div>
  );
};

export default NotifyMeButton;
