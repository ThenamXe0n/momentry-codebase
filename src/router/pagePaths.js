export const pagePaths = {
    home: "/",
    login: "/login",
    register: "/register",
    profile: "/profile",
    post: "/post",
    viewPost: "/post/view/:id",
    explore: "/explore",
    notifications: "/notifications",
    messages: "/messages",
    settings: "/settings",
    logout: "/logout",
    savePost:"/save-post",
    viewProfile:"/profile/view/:id",

    //viewProfile
    viewUserProfile:(userId)=>`/profile/view/${userId}`,

    viewPostById: (postId) => `/post/view/${postId}`,
};