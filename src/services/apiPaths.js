const apiPaths = {
  post: "/posts",
  user: "/users",
  fetchUserPostById: (userId) => `/posts?userId=${userId}`,
};

export default apiPaths;
