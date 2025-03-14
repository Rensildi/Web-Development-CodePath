import { useState } from "react";
import FlashcardList from "./components/FlashcardList";
import StreakCounter from "./components/StreakCounter";
import "./App.css";

export default function App() {
  const [streak, setStreak] = useState(0);

  return (
    <div className="app">
      <h1>Flashcards App</h1>
      <StreakCounter streak={streak} />
      <FlashcardList onStreakUpdate={setStreak} />
    </div>
  );
}
