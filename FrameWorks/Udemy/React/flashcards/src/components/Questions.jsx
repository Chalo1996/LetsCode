import React from "react";
import Question from "./Question";
import questions from "./quizes";

function Questions() {
  return (
    <div className='flashcards'>
      {questions.map((quizObj) => (
        <Question key={quizObj.id} quizObj={quizObj} />
      ))}
    </div>
  );
}

export default Questions;
