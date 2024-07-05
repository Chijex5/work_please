import React, { useState, useEffect } from 'react';
import './home.css';
import axios from 'axios';
import UserActivity from './UserActivity';

const BASE_URL = "https://mybackend-2.onrender.com";

const Home = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bestSellingBooks, setBestSellingBooks] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const token = localStorage.getItem('token');

    const fetchUser = async () => {
      if (auth === 'true' && token) {
        try {
          const response = await axios.get(`${BASE_URL}/get-user`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setName(response.data.fullname);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchBestSellingBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/top-10-selling-books`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const mappedBooks = response.data.map(book => ({
          id: book[0],
          code: book[1],
          department: book[3],
          title: book[2],
          price: book[4],
          available: book[5],
        }));

        setBestSellingBooks(mappedBooks);
      } catch (error) {
        console.error('Error fetching best selling books:', error);
      }
    };

    fetchBestSellingBooks();
  }, []);

  const recentOrders = [
    { id: '12345', customer: 'John Doe', title: 'React Basics', date: '2024-06-29' },
    { id: '12346', customer: 'Jane Smith', title: 'Advanced JavaScript', date: '2024-06-28' },
    { id: '12347', customer: 'Alex Johnson', title: 'CSS for Beginners', date: '2024-06-27' },
  ];

  

  const userActivities = [
    { user: 'John Doe', activity: 'Registered', date: '2024-06-29' },
    { user: 'Jane Smith', activity: 'Reviewed "React Basics"', date: '2024-06-28' },
    { user: 'Alex Johnson', activity: 'Purchased "CSS for Beginners"', date: '2024-06-27' },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="dashboard">
      <div id="homeSection" className="home-section">
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <h2 id="welcomeMessage">Hello {name}, Welcome to Your Dashboard</h2>
        )}
        <p>This is your dashboard where you can manage your profile, view recent orders, and explore recommended books.</p>

        <div className="dashboard-overview">
          <div className="overview-cards">
            <div className="card">
              <h3>Total Sales</h3>
              <p>$10,000.00</p>
            </div>
            <div className="card">
              <h3>Total Revenue</h3>
              <p>$15,000.00</p>
            </div>
            <div className="card">
              <h3>Books Sold</h3>
              <p>300</p>
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Book Title</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.title}</td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Top 10 Best Selling Books</h3>
        <div className="best-sellers">
          
          <ul>
            {bestSellingBooks.map(book => (
              <li key={book.id}>
                <h4>{book.code}</h4>
                <p>{book.title}</p>
                <p>₦{book.price}</p>
                <p>{book.available ? 'Available' : 'Not Available'}</p>
                <button>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>

        <UserActivity />

      </div>
    </section>
  );
}

export default Home;
