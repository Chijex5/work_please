import React from 'react';

function Modal({ closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>Items in your cart...</p>
      </div>
    </div>
  );
}

export default Modal;
