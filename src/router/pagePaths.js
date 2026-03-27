export const pagePaths = {
    home: "/",
    login: "/login",
    register: "/register",
    profile: "/profile",
    post: "/post",
    story: "/story",
    viewPost: "/post/view/:id",
    explore: "/explore",
    notifications: "/notifications",
    messages: "/messages",
    messageChatWith: (peerId) => `/messages/${peerId}`,
    settings: "/settings",
    logout: "/logout",
    savePost:"/save-post",
    viewProfile:"/profile/view/:id",

    //viewProfile
    viewUserProfile:(userId)=>`/profile/view/${userId}`,

    viewPostById: (postId) => `/post/view/${postId}`,
};