import React from 'react';
import './home.css';

function Home() {
  return (
    <section className="dashboard">
      <div id="homeSection" className="home-section">
        <h2 id="welcomeMessage">Welcome to Your Dashboard</h2>
        <p>This is your dashboard where you can manage your profile, view recent orders, and explore recommended books.</p>
        <div className="dashboard-overview">
          <div className="feature">
            <h3>About Us</h3>
            <p>At UNN Bookshop, we are a passionate team of students dedicated to leveraging technology to solve everyday problems...</p>
          </div>
          <div className="feature">
            <h3>Our Goals</h3>
            <p>One of the key challenges faced by students at UNN Bookshop has been the long queues and limited accessibility to educational materials...</p>
          </div>
          <div className="feature">
            <h3>Our Objectives</h3>
            <ul>
              <li>Develop a robust online platform that offers a comprehensive catalog of textbooks and supplementary materials.</li>
              <li>Implement features such as search filters and recommendation algorithms...</li>
              <li>Collaborate with academic departments and publishers...</li>
              <li>Provide seamless ordering and delivery services...</li>
              <li>Continuously innovate and adapt to evolving user needs...</li>
            </ul>
          </div>
          <div className="feature">
            <h3>Our Staff</h3>
            <p>UNN Bookshop, our team comprises a diverse group of individuals with a shared passion for education and technology...</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
