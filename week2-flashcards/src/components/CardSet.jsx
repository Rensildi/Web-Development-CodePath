import React, { useState } from 'react';
import Card from './Card';

function CardSet({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * cards.length)); // Random card initially
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextCard = () => {
    const nextIndex = Math.floor(Math.random() * cards.length);
    setCurrentIndex(nextIndex);
    setShowAnswer(false); // Reset answer visibility for next card
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="card-set">
      <Card card={currentCard} showAnswer={showAnswer} />
      <button onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? 'Hide Answer' : 'Show Answer'}</button>
      <button onClick={handleNextCard}>Next Card</button>
    </div>
  );
}

export default CardSet;
