import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";

const store = configureStore({
  reducer: rootReducer,
  deveTools: process.env.NODE_ENV !== "production",
});

export default store;
