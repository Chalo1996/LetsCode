import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import { Index } from "./components/Connectors";
// BrowserRouter will be used to keep track of url changes
// Link will be used to invoke a change on url when clicked
// Routes to the components proper route

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
