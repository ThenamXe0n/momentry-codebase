const apiPaths = {
  post: "/posts",
  user: "/users",
  fetchUserPostById: (userId) => `/posts?userId=${userId}`,
  fetchPostById: (id) => `/posts/${id}`,
  updateUserDetails: (userId) => `/users/${userId}`,
  userById:(userId)=>`/users/${userId}`,
  postComment:(postId)=>`/posts/${postId}`
};

export default apiPaths;
