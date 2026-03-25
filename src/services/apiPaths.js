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
  followRequests: "/followRequests",
  followRequestById: (id) => `/followRequests/${id}`,
  follows: "/follows",
  followById: (id) => `/follows/${id}`,
};

export default apiPaths;
