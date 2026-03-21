import { configureStore } from "@reduxjs/toolkit";
import TogglersReducer from "./togglerSlice";
const store = configureStore({
  reducer: {
    togglers: TogglersReducer,
  },
});


export default store