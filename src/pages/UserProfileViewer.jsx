import {
  Bookmark,
  Grid3x3,
  Info,
  MessageCircle,
  Upload,
  UserPlus,
} from "lucide-react";
import { pagePaths } from "../router/pagePaths";
import StoryTile from "../component/StoryTile";
import { useEffect, useState } from "react";
import { fetchUserDetailsbyIdAPI, fetchUserPostByIdAPI } from "../services/apiCollection";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  cancelFollowRequestAsync,
  sendFollowRequestAsync,
  unfollowAsync,
} from "../features/followSlice";
import useFollowRelationshipHook from "../hooks/useFollowRelationshipHook";
import useFollowStatsHook from "../hooks/useFollowStatsHook";

const tabs = [
  { label: "post", icon: <Grid3x3 size={32} /> },
  { label: "save", icon: <Bookmark size={32} /> },
];

export default function UserProfileViewer() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const sessionUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  const [isActive, setIsActive] = useState("post");
  const [followActionPending, setFollowActionPending] = useState(false);

  const { followersCount, followingCount, reloadFollowStats } = useFollowStatsHook(id);
  const { loading: relLoading, kind, outgoingRequestId, reload: reloadRelation } =
    useFollowRelationshipHook(id, sessionUser?.id);

  async function handleFollowButtonClick() {
    if (!sessionUser?.id || !id || kind === "self" || relLoading || followActionPending) return;
    setFollowActionPending(true);
    try {
      if (kind === "none") {
        await dispatch(
          sendFollowRequestAsync({
            senderId: sessionUser.id,
            receiverId: id,
            username: sessionUser.username,
            profilePic: sessionUser.profilePic,
          }),
        ).unwrap();
      } else if (kind === "pending_sent" && outgoingRequestId) {
        await dispatch(
          cancelFollowRequestAsync({ requestId: outgoingRequestId }),
        ).unwrap();
      } else if (kind === "following") {
        await dispatch(
          unfollowAsync({ senderId: sessionUser.id, receiverId: id }),
        ).unwrap();
      }
      await reloadRelation();
      await reloadFollowStats();
    } catch (error) {
      console.log(error);
    } finally {
      setFollowActionPending(false);
    }
  }

  async function loadMyPosts() {
    try {
      const allPost = await fetchUserPostByIdAPI(id);
      const user = await fetchUserDetailsbyIdAPI(id);
      setUserDetails(user);
      setPosts(allPost);
    } catch (error) {
      setPosts([]);
      console.log(error);
    }
  }

  const stats = [
    {
      label: "Post",
      count: posts.length || 0,
    },
    {
      label: "followers",
      count: followersCount,
    },
    {
      label: "Following",
      count: followingCount,
    },
  ];

  useEffect(() => {
    loadMyPosts();
  }, [id]);

  const followButtonLabel = (() => {
    if (relLoading || followActionPending) return "…";
    if (kind === "self") return "You";
    if (kind === "none") return "Follow";
    if (kind === "pending_sent") return "Requested";
    if (kind === "following") return "Unfollow";
    return "Follow";
  })();

  const followDisabled =
    kind === "self" || relLoading || followActionPending || !id;

  return (
    <div className="p-4">
      <div className="flex items-center ">
        <div className="w-fit">
          <StoryTile profilePic={userDetails?.profilePic} displayName={false} />
        </div>
        <div className="flex-1  w-full  grid grid-cols-3">
          {stats.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center ">
              <span className="font-medium text-lg">{item?.count}</span>
              <b className="capitalize">{item?.label}</b>
            </div>
          ))}
        </div>
      </div>
      <div>
        <strong>{userDetails?.fullName}</strong>
        <p className="text-sm font-medium capitalize">
          {userDetails?.bio} || no bio is Available to show ! add a bio
        </p>
      </div>
      <div className="my-4">
        <div className="w-full grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleFollowButtonClick}
            disabled={followDisabled}
            className={`text-white py-1 rounded-sm gap-2 text-center flex items-center justify-center px-4 disabled:opacity-50 disabled:cursor-not-allowed ${
              kind === "following"
                ? "bg-neutral-600"
                : kind === "pending_sent"
                  ? "bg-amber-500"
                  : "bg-blue-400"
            }`}
          >
            <UserPlus size={14} />
            {followButtonLabel}
          </button>
          <button
            type="button"
            className=" text-white py-1  bg-neutral-800 rounded-sm gap-2 text-center flex items-center justify-center px-4 "
          >
            <MessageCircle size={14} />
            Message
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4">
        {tabs.map((tab, tabIdx) => (
          <div
            onClick={() => {
              setIsActive(tab.label);
            }}
            key={tabIdx}
            className={` flex items-center justify-center w-full p-2 ${isActive === tab.label && "border-b-4 border-neutral-400"} `}
          >
            {tab.icon}
          </div>
        ))}
      </div>
      {isActive === "post" && (
        <section>
          {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {posts.map((post) => (
                <PostTile key={post?.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex h-[30vh]  items-center justify-center">
              <div className=" w-11/12 p-5 rounded-md flex items-center bg-neutral-100 justify-center flex-col gap-6">
                <p className="text-neutral-400 capitalize flex items-center justify-center gap-2">
                  {" "}
                  <Info />
                  No post to display
                </p>
                <Link
                  to={pagePaths.post}
                  className="px-3 py-1 rounded-md flex gap-2 items-center justify-center bg-blue-600 text-white"
                >
                  <Upload />
                  upload post
                </Link>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function PostTile({ post }) {
  return (
    <Link
      to={pagePaths.viewPostById(post.id)}
      className="w-full h-40 block"
    >
      <img
        className="h-full w-full object-cover object-center"
        src={
          post?.image ||
          "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
        }
        alt={post?.caption}
      />
    </Link>
  );
}
