import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLoader } from '../LoaderContext';
import './findbooks.css'; // Ensure you have findbooks.css for styles
import NotifyMeButton from './NotifyMeButton'; // Adjust path as per your project structure

const BASE_URL = "https://mybackend-2.onrender.com";

const FindBooks = () => {
  const { setLoading } = useLoader();
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/findbooks`);
        const mappedBooks = response.data.map(book => ({
          id: book[0],
          code: book[1],
          department: book[3],
          title: book[2],
          price: book[4],
          available: book[5],
        }));
        setBooks(mappedBooks);
        setFilteredBooks(mappedBooks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [setLoading]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.toLowerCase();
    const results = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.code.toLowerCase().includes(query) ||
      book.department.toLowerCase().includes(query)
    );
    setFilteredBooks(results);
    setShowResults(true);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === '') {
      setFilteredBooks(books);
      setShowResults(false);
    }
  };

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const handleNotifyMe = (book) => {
    console.log(`Notify me clicked for book: ${book.title}`);
  };

  return (
    <div className="find-books-container">
      {!cartVisible && (
        <>
          <form className="search-form" onSubmit={handleSearch}>
            <h2 className="section-title">Find Books</h2>
            <div className="search-input-container">
              <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Enter book title, code, or department"
                className="search-input"
              />
              <button type="submit" className="search-button">Search</button>
            </div>
          </form>
          {showResults && (
            <section className="search-results">
              <h3 className="results-title">Search Results</h3>
              <div className="results-container">
                {filteredBooks.length ? (
                  filteredBooks.map((book, index) => (
                    <div key={index} className="book-card">
                      <h4 className="book-title">{book.title}</h4>
                      <p className="book-code">Code: {book.code}</p>
                      <p className="book-department">Department: {book.department}</p>
                      <p className="book-price">Price: ₦{book.price}</p>
                      <p className={`book-availability ${book.available ? 'available' : 'not-available'}`}>
                        {book.available ? 'Available' : 'Not Available'}
                      </p>
                      {book.available ? (
                        <button onClick={() => addToCart(book)} className="add-to-cart-button">Add to Cart</button>
                      ) : (
                        <NotifyMeButton book={book} handleNotifyMe={handleNotifyMe} />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-results">No books found</p>
                )}
              </div>
            </section>
          )}
          <section className="recommended-books">
            <h3 className="recommended-title">Recommended Books</h3>
            <div className="recommended-container">
              {books.map((book, index) => (
                <div key={index} className="book-card">
                  <h4 className="book-title">{book.title}</h4>
                  <p className="book-code">Code: {book.code}</p>
                  <p className="book-department">Department: {book.department}</p>
                  <p className="book-price">Price: ₦{book.price}</p>
                  <p className={`book-availability ${book.available ? 'available' : 'not-available'}`}>
                    {book.available ? 'Available' : 'Not Available'}
                  </p>
                  {book.available ? (
                    <button onClick={() => addToCart(book)} className="add-to-cart-button">Add to Cart</button>
                  ) : (
                    <NotifyMeButton book={book} handleNotifyMe={handleNotifyMe} />
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
      {cartVisible && (
        <section className="cart">
          <h3 className="cart-title">Cart</h3>
          <div className="cart-container">
            {cart.length ? (
              cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <p className="cart-item-title">{item.title}</p>
                  <p className="cart-item-price">Price: ₦{item.price}</p>
                  <button onClick={() => handleRemoveFromCart(index)} className="remove-from-cart-button">Remove</button>
                </div>
              ))
            ) : (
              <p className="empty-cart">Cart is empty</p>
            )}
          </div>
        </section>
      )}
      <button className="floating-cart-button" onClick={toggleCartVisibility}>
        {cartVisible ? 'Back to Books' : `Cart (${cart.length})`}
      </button>
    </div>
  );
};

export default FindBooks;
