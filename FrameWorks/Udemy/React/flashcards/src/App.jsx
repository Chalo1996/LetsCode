import "./App.css";
import FlashCards from "./components/FlashCards";
import Questions from "./components/Questions";

const App = () => {
  return (
    <div className='App'>
      <FlashCards />
      <Questions/>
    </div>
  );
};

export default App;
