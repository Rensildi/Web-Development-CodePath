import { useState } from "react";
import "./Flashcard.css";

export default function Flashcard({ flashcard, onAnswer }) {
  const [userInput, setUserInput] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const checkAnswer = () => {
    const isCorrect =
      userInput.trim().toLowerCase() === flashcard.answer.toLowerCase();
    setFeedbackMessage(isCorrect ? "✅ Correct!" : "❌ Try again.");
    onAnswer(isCorrect);
  };

  return (
    <div className="flashcard">
      <p>{flashcard.question}</p>
      <input
        className="colorText"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your answer"
      />
      <button onClick={checkAnswer}>Submit</button>
      <p className="feedback">{feedbackMessage}</p>
    </div>
  );
}
