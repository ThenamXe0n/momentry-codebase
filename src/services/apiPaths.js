const apiPaths = {
  post: "/posts",
  user: "/users",
  notifications: "/notifications",
  notificationById: (id) => `/notifications/${id}`,
  fetchUserPostById: (userId) => `/posts?userId=${userId}`,
  fetchPostById: (id) => `/posts/${id}`,
  updateUserDetails: (userId) => `/users/${userId}`,
  userById:(userId)=>`/users/${userId}`,
  postComment:(postId)=>`/posts/${postId}`,
  savedPosts: "/savedPosts",
  savedPostById: (id) => `/savedPosts/${id}`,
};

export default apiPaths;
