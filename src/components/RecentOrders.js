import React from 'react';
import './RecentOrders.css';

function RecentOrders() {
  const orders = [
    { id: 1234, books: 5, amount: '₦50000', status: 'Delivered' },
    { id: 5678, books: 3, amount: '₦3000', status: 'Processing' }
    // Add more orders as needed
  ];

  const getStatusStyle = (status) => {
    return status === 'Delivered' ? 'delivered' : 'processing';
  };

  return (
    <div id="recentOrdersSection" className="orders-section">
      <h2>Recent Orders</h2>
      <ul id="recentOrders">
        {orders.map((order, index) => (
          <li key={index} className="order-item">
            <div>
              <strong>Order #{order.id}</strong> - {order.books} books - {order.amount} - <span className={getStatusStyle(order.status)}>{order.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentOrders;
