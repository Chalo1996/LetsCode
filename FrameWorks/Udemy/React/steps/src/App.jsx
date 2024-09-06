import React from "react";
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  return <Step />;
};

const Step = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePreviousBtn = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleNextBtn = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <>
      <button
        className='close'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        &times;
      </button>
      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className='buttons'>
            <Button
              bgColor={"#7950f2"}
              textColor={"#fff"}
              onClick={handlePreviousBtn}
            >
              <span>👈</span> Previous
            </Button>
            <Button
              bgColor={"#7950f2"}
              textColor={"#fff"}
              onClick={handleNextBtn}
            >
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const StepMessage = ({ step, children }) => {
  return (
    <div className='message'>
      <h3>Step {step}</h3>
      {children}
    </div>
  );
};

const Button = ({ textColor, bgColor, onClick, children }) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default App;
