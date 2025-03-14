import { useState } from "react";
import Flashcard from "./Flashcard";
import { flashcards as initialFlashcards } from "../data";

export default function FlashcardList({ onStreakUpdate }) {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const shuffleCards = () => {
    setFlashcards([...flashcards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    onStreakUpdate(streak + (isCorrect ? 1 : 0));
  };

  return (
    <div>
      <Flashcard flashcard={flashcards[currentIndex]} onAnswer={handleAnswer} />
      <div className="buttons">
        <button onClick={prevCard}>Back</button>
        <button onClick={nextCard}>Next</button>
        <button onClick={shuffleCards}>Shuffle</button>
      </div>
    </div>
  );
}
