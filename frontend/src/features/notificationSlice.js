import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchNotificationsForReceiverAPI,
  postNotificationAPI,
  patchNotificationAPI,
  patchFollowRequestAPI,
  postFollowAPI,
  fetchFollowsAPI,
} from "../services/apiCollection";

const initialState = {
  isLoading: false,
  list: [],
  error: null,
};

export const fetchNotificationsAsync = createAsyncThunk(
  "notification/fetchForUser",
  async (receiverId, { rejectWithValue }) => {
    try {
      const data = await fetchNotificationsForReceiverAPI(receiverId);
      const sorted = [...(data || [])].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      return sorted;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const postNotificationAsync = createAsyncThunk(
  "notification/post",
  async (payload, { rejectWithValue }) => {
    try {
      return await postNotificationAPI(payload);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const acceptFollowRequestAsync = createAsyncThunk(
  "notification/acceptFollow",
  async ({ notification, accepter }, { rejectWithValue }) => {
    try {
      if (notification.followRequestId) {
        try {
          await patchFollowRequestAPI(notification.followRequestId, {
            status: "accepted",
          });
        } catch {
          /* request row may have been removed */
        }
      }
      const already = await fetchFollowsAPI({
        senderId: notification.actorId,
        receiverId: accepter.id,
      });
      if (!already?.length) {
        await postFollowAPI({
          senderId: notification.actorId,
          receiverId: accepter.id,
          createdAt: new Date().toISOString(),
        });
      }
      await patchNotificationAPI(notification.id, { status: "accepted" });
      await postNotificationAPI({
        receiverId: notification.actorId,
        actorId: accepter.id,
        username: accepter.username,
        profilePic: accepter.profilePic || "",
        type: "follow_accepted",
        message: "accepted your follow request",
        createdAt: new Date().toISOString(),
      });
      return notification.id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(acceptFollowRequestAsync.fulfilled, (state, action) => {
        const id = action.payload;
        const item = state.list.find((n) => String(n.id) === String(id));
        if (item) item.status = "accepted";
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
