import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostByIdAPI, postCommentAPI } from "../services/apiCollection";
import { postNotificationAsync } from "./notificationSlice";

const initialState = {
  isLoading: false,
  seletedPostcomments: [],
  selectedPostId: null,
};

export const fetchPostCommentAsync = createAsyncThunk(
  "comment/fetch",
  async (postId) => {
    try {
      const response = await fetchPostByIdAPI(postId);
      return { comments: response?.comments || [], postId: response.id };
    } catch (error) {
      return error;
    }
  },
);

export const postCommentAsync = createAsyncThunk(
  "comment/post",
  async ({ postId, comment }, { dispatch }) => {
    try {
      const response = await postCommentAPI(postId, comment);
      if (response?.userId && response.userId !== comment.userId) {
        dispatch(
          postNotificationAsync({
            receiverId: response.userId,
            actorId: comment.userId,
            username: comment.username,
            profilePic: comment.profilePic || "",
            type: "comment",
            message: "commented on your post",
            createdAt: new Date().toISOString(),
            postId: response.id,
            postImage: response.image,
          }),
        );
      }
      return response;
    } catch (error) {
      throw new Error("something went wrong");
    }
  },
);

const CommentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    handleRestComments: (state) => {
      state.selectedPostId = null;
      state.seletedPostcomments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostCommentAsync.fulfilled, (state, action) => {
        ((state.seletedPostcomments = action.payload.comments),
          (state.selectedPostId = action.payload.postId));
      })
      .addCase(postCommentAsync.fulfilled, (state, action) => {
        state.seletedPostcomments = action.payload.comments || [];
      });
  },
});

export const { handleRestComments } = CommentSlice.actions;

export default CommentSlice.reducer;
