import React from 'react';

function Card({ card, showAnswer }) {
  return (
    <div className="card">
      <p>{showAnswer ? card.answer : card.question}</p>
      <p>Category: {card.category}</p>
    </div>
  );
}

export default Card;
