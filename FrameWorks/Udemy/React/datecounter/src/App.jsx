import { useState } from "react";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(1);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Counter
        count={count}
        setCount={setCount}
        step={step}
        setStep={setStep}
      />
      <DateCmp count={count} date={date} />
    </>
  );
};

const Counter = ({ count, setCount, step, setStep }) => {
  const handleRangeChange = (e) => {
    setStep(parseInt(e.target.value));
  };

  const handleNumChange = (e) => {
    setCount(parseInt(e.target.value));
  };

  const handleReset = () => {
    setCount(1);
    setStep(0);
  };

  return (
    <div>
      <div>
        <input
          type='range'
          min={0}
          max={10}
          value={step}
          onChange={handleRangeChange}
        />
        <br />
        <button
          onClick={() => {
            setStep(step - 5);
          }}
        >
          -
        </button>
        Step: {step}
        <button
          onClick={() => {
            setStep(step + 5);
          }}
        >
          +
        </button>
        <br />
        <button
          onClick={() => {
            setCount(count - step);
          }}
        >
          -
        </button>
        <input
          type='number'
          name='date'
          id='dt'
          value={count}
          onChange={handleNumChange}
        />
        <button
          onClick={() => {
            setCount(count + step);
          }}
        >
          +
        </button>
        {count !== 1 || step !== 0 ? (
          <div>
            <button onClick={handleReset}>Reset</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const DateCmp = ({ count, date }) => {
  const adjustedDateCount = new Date(date);
  adjustedDateCount.setDate(date.getDate() + count);
  const adjustedMonth = adjustedDateCount.toLocaleDateString("en-US", {
    month: "long",
  });
  const dayShort = adjustedDateCount.toLocaleDateString("en-US", {
    weekday: "short",
  });
  const year = adjustedDateCount.getFullYear();
  const str = "from today will be";

  return (
    <>
      <p>
        {count >= 0
          ? count === 0
            ? "Today is "
            : count === 1
            ? `1 Day ${str} `
            : `${count} Days ${str} `
          : count === -1
          ? "Yesterday was "
          : `${Math.abs(count)} Days ago was `}{" "}
        {adjustedMonth} {dayShort} {year}
      </p>
    </>
  );
};

export default App;
