import React from 'react';
import axios from 'axios';
import './NotifyMeButton.css';
const BASE_URL = "https://mybackend-2.onrender.com";


const NotifyMeButton = ({ book, handleNotifyMe }) => {
  const notifyUser = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const response = await axios.post
        (`${BASE_URL}/create-notification`,
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
    } catch (error) {
      console.error('Error notifying user:', error);
    }
  };

  

  return (
    <button onClick={notifyUser} className="notify-me-button">
      Notify Me
    </button>
  );
};

export default NotifyMeButton;
