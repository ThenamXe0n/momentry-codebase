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
// export const loginUserAPI = async(payload)=>{
//     try{

//     }catch(error){

//     }
// }
