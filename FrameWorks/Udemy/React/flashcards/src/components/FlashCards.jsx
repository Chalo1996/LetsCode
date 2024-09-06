import React, { useState } from "react";
import questions from "./quizes";

function FlashCards() {
  const [selectedId, setSelectedId] = useState(1297);

  const handleClick = (id) => {
    setSelectedId(id);
  };

  return (
    <div className='flashcards' style={{ margin: "10px" }}>
      {questions.map((quizObj) => (
        <div
          key={quizObj.id}
          onClick={() => handleClick(quizObj.id)}
          className={quizObj.id === selectedId ? "selected" : ""}
        >
          <p>{quizObj.id === selectedId ? quizObj.answer : quizObj.question}</p>
        </div>
      ))}
    </div>
  );
}

export default FlashCards;
