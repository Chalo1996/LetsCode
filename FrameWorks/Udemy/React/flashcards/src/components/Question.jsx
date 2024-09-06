import React, { useState } from "react";

function Question({ quizObj }) {
  const [isAnswerShown, setIsAswerShown] = useState(false);
  const [isQuizShown, setIsQuizShown] = useState(true);

  return (
    <>
      {isAnswerShown ? (
        <button onClick={() => setIsAswerShown(!isQuizShown)}>
          {quizObj.answer}
        </button>
      ) : (
        <button onClick={() => setIsAswerShown(isQuizShown)}>
          {" "}
          {quizObj.question}
        </button>
      )}
    </>
  );
}

export default Question;
