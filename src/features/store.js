import { configureStore } from "@reduxjs/toolkit";
import TogglersReducer from "./togglerSlice";
import CommentsReducer from "./commentSlice";
const store = configureStore({
  reducer: {
    togglers: TogglersReducer,
    comments: CommentsReducer,
  },
});

export default store;
