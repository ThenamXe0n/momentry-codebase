import { configureStore } from "@reduxjs/toolkit";
import TogglersReducer from "./togglerSlice";
import CommentsReducer from "./commentSlice";
import NotificationsReducer from "./notificationSlice";
import FollowReducer from "./followSlice";

const store = configureStore({
  reducer: {
    togglers: TogglersReducer,
    comments: CommentsReducer,
    notifications: NotificationsReducer,
    follow: FollowReducer,
  },
});

export default store;
