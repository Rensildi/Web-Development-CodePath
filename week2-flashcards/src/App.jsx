import React, { useState } from 'react';
import './styles/App.css';
import CardSet from './components/CardSet';
import Header from './components/Header';

function App() {
  const cardSet = [
    { question: "What is the capital of France?", answer: "Paris", category: "Geography" },
    { question: "What is 2 + 2?", answer: "4", category: "Math" },
    { question: "What is the boiling point of water?", answer: "100°C", category: "Science" },
    { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee", category: "Literature" },
    { question: "What is the largest planet in our solar system?", answer: "Jupiter", category: "Science" },
    { question: "What is the chemical symbol for gold?", answer: "Au", category: "Chemistry" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci", category: "Art" },
    { question: "What is the speed of light?", answer: "299,792,458 m/s", category: "Physics" },
    { question: "What is the smallest prime number?", answer: "2", category: "Math" },
    { question: "What is the longest river in the world?", answer: "The Nile", category: "Geography" },
    { question: "What is the most abundant gas in Earth's atmosphere?", answer: "Nitrogen", category: "Science" },
    { question: "Which planet is known as the Red Planet?", answer: "Mars", category: "Astronomy" },
    { question: "What is the freezing point of water?", answer: "0°C", category: "Science" },
    { question: "What is the hardest natural substance on Earth?", answer: "Diamond", category: "Geology" },
    { question: "Who was the first president of the United States?", answer: "George Washington", category: "History" }
  ];

  return (
    <div className="App">
      <Header title="Flashcards App" description="Test your knowledge with these flashcards!" totalCards={cardSet.length} />
      <CardSet cards={cardSet} />
    </div>
  );
}

export default App;
