import { useState } from "react";
import "./Accordion.css";
import Accordion from "./components/Accordion";
import faqs from "./faqs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Accordion faqs={faqs} />
    </div>
  );
}

export default App;
