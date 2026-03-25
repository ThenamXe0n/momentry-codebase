import { configureStore } from "@reduxjs/toolkit";
import TogglersReducer from "./togglerSlice";
import CommentsReducer from "./commentSlice";
import NotificationsReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    togglers: TogglersReducer,
    comments: CommentsReducer,
    notifications: NotificationsReducer,
  },
});

export default store;
