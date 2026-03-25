import React from "react";
import { Link } from "react-router";
import { pagePaths } from "../router/pagePaths";
import { useDispatch } from "react-redux";
import { handleOpenPopup } from "../features/togglerSlice";
import CommentModal from "./modals/CommentModal";
import { fetchPostCommentAsync } from "../features/commentSlice";
import { postNotificationAsync } from "../features/notificationSlice";
import { likePostAPI } from "../services/apiCollection";

const PostDisplayCard = React.memo(function ({ post, liked, setPosts }) {
  const dispatch = useDispatch();

  async function handlePostLike() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser?.id) return;
    try {
      const newLikes = [...new Set([...(post.likes || []), loggedInUser.id])];
      await likePostAPI(post.id, newLikes);
      setPosts?.((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, likes: newLikes } : p)),
      );
      if (post.userId !== loggedInUser.id) {
        dispatch(
          postNotificationAsync({
            receiverId: post.userId,
            actorId: loggedInUser.id,
            username: loggedInUser.username,
            profilePic: loggedInUser.profilePic || "",
            type: "like",
            message: "liked your post",
            createdAt: new Date().toISOString(),
            postId: post.id,
            postImage: post.image,
          }),
        );
      }
    } catch (error) {
      console.log(error?.message);
    }
  }

  async function handlePostDislike() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser?.id) return;
    try {
      const newLikes = (post.likes || []).filter((id) => id !== loggedInUser.id);
      await likePostAPI(post.id, newLikes);
      setPosts?.((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, likes: newLikes } : p)),
      );
    } catch (error) {
      console.log(error?.message);
    }
  }

  function handleOpenComments(){
    dispatch(handleOpenPopup({modal:<CommentModal/>}))
    dispatch(fetchPostCommentAsync(post.id))
  }


  console.log(post);

  return (
    <div id={post?.id} className="w-full overflow-hidden h-[75dvh] ">
      {/* //headers  */}
      <div className="flex p-2 justify-between">
        <div className="flex items-start gap-3">
          <div className="size-8 rounded-full border">
            <img
              className="h-full w-full"
              src={post?.userDetails?.profilePic ||  "/assets/noprofile.avif"}
              alt={post?.userDetails?.username}
            />
          </div>
          <Link className="font-bold" to={pagePaths.viewUserProfile(post.userId)}>{post?.userDetails?.username}</Link>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>
      </div>
      {/* //post */}
      <div className="h-[73%] w-full">
        <img
          src={post?.image}
          alt={post?.caption}
          className="h-full w-full object-contain"
        />
      </div>
      {/* //footer i.e caption and commets */}
      <div className="p-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            {/* like */}
            <button
              type="button"
              onClick={() => (liked ? handlePostDislike() : handlePostLike())}
              className="flex items-center cursor-pointer bg-transparent border-none p-0"
            >
              {!liked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  className="size-6"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              )}

              <span>{post?.likes?.length || 0}</span>
            </button>
            {/* comments */}
            <div onClick={handleOpenComments} className="flex  items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>

              <span>{post?.comments?.length || 0}</span>
            </div>
          </div>
          {/* save */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-1">
          <strong>{post?.user?.username}</strong>
          <p>{post?.caption}</p>
        </div>
        <p>6 hours ago</p>
      </div>
    </div>
  );
});

export default PostDisplayCard;
