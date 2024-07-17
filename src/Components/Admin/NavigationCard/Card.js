import React from 'react';
import './Card.css';

const Card = ({ title }) => {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-content">Some text</div>
      <button className="card-button">Button</button>
    </div>
  );
};

export default Card;
