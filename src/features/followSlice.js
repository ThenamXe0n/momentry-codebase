import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteFollowRequestAPI,
  fetchFollowRequestsAPI,
  fetchFollowsAPI,
  postFollowRequestAPI,
  deleteFollowAPI,
} from "../services/apiCollection";
import { postNotificationAsync } from "./notificationSlice";

export const sendFollowRequestAsync = createAsyncThunk(
  "follow/sendRequest",
  async (
    { senderId, receiverId, username, profilePic },
    { dispatch, rejectWithValue },
  ) => {
    try {
      if (!senderId || !receiverId || senderId === receiverId) {
        return rejectWithValue("invalid");
      }
      const pending = await fetchFollowRequestsAPI({
        senderId,
        receiverId,
        status: "pending",
      });
      if (pending?.length) return pending[0];
      const existingFollow = await fetchFollowsAPI({ senderId, receiverId });
      if (existingFollow?.length) return existingFollow[0];
      const req = await postFollowRequestAPI({
        senderId,
        receiverId,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      await dispatch(
        postNotificationAsync({
          receiverId,
          actorId: senderId,
          username,
          profilePic: profilePic || "",
          type: "follow_request",
          message: "sent you a follow request",
          createdAt: new Date().toISOString(),
          status: "pending",
          followRequestId: req.id,
        }),
      ).unwrap();
      return req;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const cancelFollowRequestAsync = createAsyncThunk(
  "follow/cancelRequest",
  async ({ requestId }, { rejectWithValue }) => {
    try {
      if (!requestId) return rejectWithValue("missing id");
      await deleteFollowRequestAPI(requestId);
      return requestId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const unfollowAsync = createAsyncThunk(
  "follow/unfollow",
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      const list = await fetchFollowsAPI({ senderId, receiverId });
      const row = list[0];
      if (row) await deleteFollowAPI(row.id);
      return { senderId, receiverId };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const followSlice = createSlice({
  name: "follow",
  initialState: {},
  reducers: {},
});

export default followSlice.reducer;
