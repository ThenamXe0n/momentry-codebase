import { Heart, LoaderCircle, Send } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const CommentModal = () => {
  const { popupOpen, isLoading } = useSelector((state) => state.togglers);
  const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(popupOpen);
  return (
    <div
      className={`h-11/12 ${popupOpen ? "translate-y-0" : "translate-y-full"} duration-700 relative rounded-tl-3xl text-white rounded-tr-3xl self-end w-full bg-neutral-700`}
    >
      <div className="h-1 bg-white rounded-full w-4/12 mx-auto"></div>
      <p className="text-center my-2">Comments</p>
      {/* //comment section */}
      {isLoading ? (
        <div className="space-y-4 h-11/12 flex items-center text-xl animate-pulse justify-center gap-2">
          <LoaderCircle color="dodgerblue" className="animate-spin" />
          Loading...
        </div>
      ) : (
        <div className="space-y-4 h-11/12">
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
          <CommentTile />
        </div>
      )}
      {/* //post a comment */}
      <div className="w-full p-3 absolute gap-4 mx-auto flex items-stretch bottom-0 bg-neutral-800 ">
        <div className="  size-10 rounded-full">
          <img
            className="h-full w-full"
            src={userDetails?.profilePic || "/assets/noprofile.avif"}
            alt={userDetails?.username}
          />
        </div>
        <div className="ring-2 flex px-3  rounded-xl ring-neutral-300/30 flex-1 ">
          <input
            className="py-2 outline-0 flex-1 "
            placeholder="write a comment..."
          />
          <button>
            <Send color="dodgerblue" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;

function CommentTile({ comment, liked = true }) {
  return (
    <div className="px-2 flex items-center w-11/12 mx-auto gap-3">
      <div className="border-2 size-10 rounded-full"></div>
      <div className="flex-1">
        <b>
          username <span className="text-neutral-200/60 font-medium">3h</span>
        </b>
        <p>Jalwa h</p>
      </div>
      <div className="flex items-center flex-col text-sm">
        {!liked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-neutral-200/60"
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
            className="size-5"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        )}
        12
      </div>
    </div>
  );
}
