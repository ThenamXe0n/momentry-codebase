const apiPaths = {
  post: "/posts",
  user: "/users",
  fetchUserPostById: (userId) => `/posts?userId=${userId}`,
  updateUserDetails: (userId) => `/users/${userId}`,
  userById:(userId)=>`/users/${userId}`
};

export default apiPaths;
