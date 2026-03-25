import { pagePaths } from "../router/pagePaths";
import apiPaths from "./apiPaths";
import axiosInstance from "./axiosInstance";

export const registerUserAPI = async (payload) => {
  try {
    const response = await axiosInstance.post("/users", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const loginUserAPI = async (payload) => {
  try {
    const isUserExist = await axiosInstance.get(
      `/users?email=${payload.email}`,
    );
    if (isUserExist.data.length <= 0) {
      alert("no such user found!");
      return;
    }
    //password checks
    console.log("check", isUserExist.data[0].password !== payload.password);
    if (isUserExist?.data[0].password !== payload.password) {
      alert("invalid credentials!!");
      return;
    }

    //passed all checkins
    localStorage.setItem("loggedInUser", JSON.stringify(isUserExist.data[0]));
    localStorage.setItem("loginStatus", "loggedIn");
    window.location.replace(pagePaths.home);
  } catch (error) {
    alert(error);
    throw new Error("something went wrong");
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

// export const loginUserAPI = async(payload)=>{
//     try{

//     }catch(error){

//     }
// }
