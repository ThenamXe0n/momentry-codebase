import axios from "axios";
import { pagePaths } from "../router/pagePaths";
import apiPaths from "./apiPaths";
import axiosInstance from "./axiosInstance";

const AUTH_BASE_URL = "http://localhost:5000/api/auth";

export const registerUserAPI = async (payload) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/register`, payload);
    return {
      ...response.data,
      status: response.data.success,
    };
  } catch (error) {
    console.error("Register API error:", error);
    const errMsg = error.response?.data?.message || "Registration failed";
    throw new Error(errMsg);
  }
};

export const loginUserAPI = async (payload) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, payload);
    const { success, data } = response.data;

    if (!success || !data) {
      alert("Login failed");
      return;
    }

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("loggedInUser", JSON.stringify(data.user));
    localStorage.setItem("loginStatus", "loggedIn");
    window.location.replace(pagePaths.home);
  } catch (error) {
    console.error("Login API error:", error);
    const errMsg = error.response?.data?.message || "Invalid credentials!!";
    alert(errMsg);
    throw new Error(errMsg);
  }
};

export const uploadPostAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(apiPaths.post, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchUserPostByIdAPI = async (userId) => {
  try {
    const response = await axiosInstance.get(
      apiPaths.fetchUserPostById(userId),
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};
export const fetchPostByIdAPI = async (postId) => {
  try {
    const response = await axiosInstance.get(apiPaths.fetchPostById(postId));
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchAllPostAPI = async () => {
  try {
    const response = await axiosInstance.get(apiPaths.post);
    // const getAllUser = await axiosInstance.get(apiPaths.USER);
    // console.log("posts", response.data);
    // console.log("all users", getAllUser.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserAPI = async (payload, userId) => {
  try {
    const response = await axiosInstance.put(
      apiPaths.updateUserDetails(userId),
      payload,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};
export const fetchUserDetailsbyIdAPI = async (userId) => {
  try {
    const response = await axiosInstance.get(apiPaths.userById(userId));
    delete response?.data?.password;
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const postCommentAPI = async (postId, newComment) => {
  try {
    // get post details
    const post = await fetchPostByIdAPI(postId);
    let newCommentsList = [...post.comments, newComment];

    const response = await axiosInstance.patch(
      apiPaths.postComment(postId),
      {comments:newCommentsList},
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const likePostAPI = async (postId, likes) => {
  try {
    const response = await axiosInstance.patch(apiPaths.fetchPostById(postId), {
      likes,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const postSavedPostAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(apiPaths.savedPosts, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchSavedPostsByUserIdAPI = async (userId) => {
  try {
    const response = await axiosInstance.get(apiPaths.savedPosts, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const deleteSavedPostAPI = async (savedPostId) => {
  try {
    await axiosInstance.delete(apiPaths.savedPostById(savedPostId));
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const postNotificationAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(apiPaths.notifications, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchNotificationsForReceiverAPI = async (receiverId) => {
  try {
    const response = await axiosInstance.get(apiPaths.notifications, {
      params: { receiverId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const patchNotificationAPI = async (notificationId, partial) => {
  try {
    const response = await axiosInstance.patch(
      apiPaths.notificationById(notificationId),
      partial,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchFollowRequestsAPI = async (params) => {
  try {
    const response = await axiosInstance.get(apiPaths.followRequests, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const postFollowRequestAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(apiPaths.followRequests, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const patchFollowRequestAPI = async (requestId, partial) => {
  try {
    const response = await axiosInstance.patch(
      apiPaths.followRequestById(requestId),
      partial,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const deleteFollowRequestAPI = async (requestId) => {
  try {
    await axiosInstance.delete(apiPaths.followRequestById(requestId));
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchFollowsAPI = async (params) => {
  try {
    const response = await axiosInstance.get(apiPaths.follows, { params });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const postFollowAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(apiPaths.follows, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const deleteFollowAPI = async (followId) => {
  try {
    await axiosInstance.delete(apiPaths.followById(followId));
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

function pickLatestStoryPerUser(stories) {
  const byUser = new Map();
  for (const s of stories || []) {
    const uid = String(s.userId);
    const prev = byUser.get(uid);
    const ta = new Date(s.createdAt || 0).getTime();
    const tb = prev ? new Date(prev.createdAt || 0).getTime() : -Infinity;
    if (!prev || ta >= tb) byUser.set(uid, s);
  }
  return Array.from(byUser.values()).sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
  );
}

export const uploadStoryAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(apiPaths.stories, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchAllStoriesAPI = async () => {
  try {
    const response = await axiosInstance.get(apiPaths.stories);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchStoriesFeedForUserAPI = async (loggedInUserId) => {
  try {
    if (!loggedInUserId) return [];
    const follows = await fetchFollowsAPI({ senderId: loggedInUserId });
    const followingIds = new Set(
      (follows || []).map((f) => String(f.receiverId)),
    );
    if (followingIds.size === 0) return [];
    const all = await fetchAllStoriesAPI();
    const filtered = (all || []).filter((s) =>
      followingIds.has(String(s.userId)),
    );
    return pickLatestStoryPerUser(filtered);
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchAllMessagesAPI = async () => {
  try {
    const response = await axiosInstance.get(apiPaths.messages);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchMessagesForUserAPI = async (userId) => {
  try {
    const all = await fetchAllMessagesAPI();
    return (all || []).filter(
      (m) => m.senderId === userId || m.receiverId === userId,
    );
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const fetchMessagesBetweenUsersAPI = async (userId, peerId) => {
  try {
    const all = await fetchAllMessagesAPI();
    return (all || [])
      .filter(
        (m) =>
          (m.senderId === userId && m.receiverId === peerId) ||
          (m.senderId === peerId && m.receiverId === userId),
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
      );
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const postMessageAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(apiPaths.messages, payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

// export const loginUserAPI = async(payload)=>{
//     try{

//     }catch(error){

//     }
// }
