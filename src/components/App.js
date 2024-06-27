import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

// Define Contact component outside of App component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., send data to the server
    setSubmitted(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2>Contact Us</h2>
        {submitted ? (
          <div className="success-message">
            <p>Thank you! We will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} id='contact-form'>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </section>
  );
}

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="logo">
          </div>
          <nav>
            <ul className={`nav-links ${menuActive ? 'active' : ''}`} id="nav-linked">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#login" onClick={() => navigate('/login')}> Sign in</a></li>
              <li><a href="#signup" onClick={() => navigate('/signup')}> Sign Up</a></li>
              <li><a href="#join-our-staff" onClick={() => navigate('/join-staff')}>Join Our Staff</a></li>
            </ul>
            <h4 className='navi'>Navigation Menu</h4>
            <div className={`hamburger-menu ${menuActive ? 'active' : ''}`} id="hamburger-menu" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container">
          <h1>Welcome to UniBook Exchange</h1>
          <p>Simplifying Your Textbook Experience: Buy, Sell, and Deliver with Ease</p>
          <div className="cta-buttons">
            <a href="#get-started" onClick={() => navigate('/login')} className="btn">Sign in</a>
            <a href="#learn-more" onClick={() => navigate('/signup')} className="btn">Sign up</a>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <h2>About Us</h2>
          <p>At UNN Bookshop, we are a passionate team of students dedicated to leveraging technology to solve everyday problems...</p>
          <img src="https://i.imgur.com/DaZaDqJ.jpeg" alt="About Us" className="about-image" />
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="service-cards">
            <div className="card">
              <img src="https://i.imgur.com/4kzQ1Yn.jpeg" alt="Service 1" />
              <h3>Hassle-Free Textbook Shopping</h3>
              <p>Skip the long queues and avoid standing in the sun with our convenient online textbook shopping service. Our website offers a comprehensive catalog of all the textbooks you need for your courses. Easily check the availability of the books you want, place your order, and have them delivered directly to your doorstep. Experience a seamless and efficient way to get your textbooks without the wait!</p>
            </div>
            <div className="card">
              <img src="https://i.imgur.com/zBXxmf8.jpeg" alt="Service 2" />
              <h3>Earn Money by Selling Your Old Textbooks</h3>
              <p>Turn your old textbooks and materials into cash with our easy-to-use online platform. Our website allows students to list their used textbooks for sale, connecting them with fellow students in need of affordable study materials. Not only do you declutter your space, but you also earn some extra money while helping others. Join our community of students making a difference, one book at a time!</p>
            </div>
            <div className="card">
              <img src="https://i.imgur.com/47i4Q5w.jpeg" alt="Service 3" />
              <h3>Join Our Team as a Book Delivery Agent</h3>
              <p>Looking for a flexible job opportunity? Become a book delivery agent with us! Help your fellow students get their textbooks quickly and efficiently while earning money on your own schedule. As a delivery agent, you play a crucial role in ensuring timely deliveries, enhancing the overall shopping experience. Join our team today and start making a difference in your university community!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-carousel">
            <div className="testimonial">
              <img src="https://i.imgur.com/ZNiOI8f.jpeg" alt="Daniel A" className="testimonial-image" />
              <p className="testimony">"The online textbook store has been a lifesaver! I used to spend hours in line under the scorching sun, only to find out the book I needed was out of stock. Now, I can easily check availability and order my books from the comfort of my dorm room. The delivery is super quick too! I highly recommend this service to all my fellow students."</p>
              <h4>Daniel A</h4>
            </div>
            <div className="testimonial">
              <img src="https://i.imgur.com/XRgs27y.jpeg" alt="Precious Neye" className="testimonial-image" />
              <p className="testimony">"Shopping for textbooks online has never been easier. The website is user-friendly, and I love that I can see all the textbooks available for my courses in one place. I ordered my books, and they were delivered right to my doorstep within a couple of days. No more standing in long queues for me!"</p>
              <h4>Precious Neye</h4>
            </div>
            <div className="testimonial">
              <img src="https://i.imgur.com/ygrTVD5.jpeg" alt="Peace Chisom" className="testimonial-image" />
              <p className="testimony">"Selling my old textbooks through the website was a fantastic experience. The process was straightforward, and I managed to make some extra cash while decluttering my room. It's a great way to support other students and recycle your study materials. I’ll definitely use this service again at the end of the semester."</p>
              <h4>Peace Chisom</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <img src="https://i.imgur.com/YhA4ZrK.jpeg" alt="Feature 1" />
              <h3>Convenience and Efficiency</h3>
              <p>Avoid long queues and the hassle of standing under the sun by shopping for textbooks online. Our website provides a seamless, efficient experience, ensuring you get the books you need without the wait. With just a few clicks, you can check availability, place your order, and have your textbooks delivered directly to your doorstep.</p>
            </div>
            <div className="feature-card">
              <img src="https://i.imgur.com/sLVnWad.jpeg" alt="Feature 2" />
              <h3>Earn and Save Money</h3>
              <p>Our platform not only helps you buy new textbooks but also allows you to sell your old ones. Turn your used textbooks into cash and find affordable study materials from fellow students. By choosing us, you join a community that values sustainability and supports each other financially.</p>
            </div>
            <div className="feature-card">
              <img src="https://i.imgur.com/3pCzqcq.jpeg" alt="Feature 3" />
              <h3>Flexible Job Opportunities</h3>
              <p>Looking for a job that fits your schedule? Become a book delivery agent and help your peers receive their textbooks quickly. This role offers a flexible work opportunity that lets you earn money while contributing to the university community. Join us and make a positive impact while gaining valuable work experience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta" id="get-started">
        <div className="container">
          <h2 className="ggg">Get Started Today</h2>
          <p>Join the UniBook Exchange community and experience hassle-free textbook shopping.</p>
          <a href="#signup" onClick={() => navigate('/signup')} className="btn">Sign Up Now</a>
          <a href="#join-our-staff" onClick={() => navigate('/join-staff')} className="btn">Join Our Staff </a>
        </div>
      </section>

      <Contact />

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 UniBook Exchange. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
