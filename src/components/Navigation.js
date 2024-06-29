import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="navigation-header">
      <div className="container">
        <div className="navigation-menu">
          <div className={`hamburger ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          
          <ul className={menuActive ? 'active' : ''}>
            <li><NavLink exact to="/" activeClassName="active" onClick={toggleMenu}>Home</NavLink></li>
            <li><NavLink to="/find-books" activeClassName="active" onClick={toggleMenu}>Find Books</NavLink></li>
            <li><NavLink to="/recent-orders" activeClassName="active" onClick={toggleMenu}>Recent Orders</NavLink></li>
            <li><NavLink to="/join-staff" activeClassName="active" onClick={toggleMenu}>Join Us</NavLink></li>
            <li><NavLink to="/profile" activeClassName="active" onClick={toggleMenu}>Profile</NavLink></li>
            <li><NavLink to="/notification" activeClassName="active" onClick={toggleMenu}>Notification</NavLink></li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
