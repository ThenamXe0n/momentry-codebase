import React, { useState } from "react";
import { Link } from "react-router";
import StoryTile from "../component/StoryTile";
import usePostHook from "../hooks/usePostHook";
import useSavedPostsHook from "../hooks/useSavedPostsHook";
import useStoryFeedHook from "../hooks/useStoryFeedHook";
import PostDisplayCard from "../component/PostDisplayCard";
import StoryPortal from "../portal/StoryPortal";
import { pagePaths } from "../router/pagePaths";

function mapApiStoryToUi(apiStory) {
  return {
    id: apiStory.id,
    content: apiStory.image,
    duration: apiStory.duration || 5000,
    user: {
      name: apiStory.userDetails?.username || "user",
      avatar:
        apiStory.userDetails?.profilePic || "/assets/noprofile.avif",
    },
  };
}

const Home = () => {
  const { posts, setPosts } = usePostHook();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const { savedPosts, setSavedPosts } = useSavedPostsHook(loggedInUser?.id);
  const { stories: feedStories } = useStoryFeedHook(loggedInUser?.id);

  const [storyPortalOpen, setStoryPortalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="w-full overflow-x-scroll">
      <div className="px-2 flex items-center gap-2 w-fit py-2">
        <Link
          to={pagePaths.story}
          className="flex flex-col items-center shrink-0"
        >
          <StoryTile
            mystory
            profilePic={loggedInUser?.profilePic}
            displayName={false}
          />
        </Link>
        {feedStories.map((raw) => {
          const uiStory = mapApiStoryToUi(raw);
          return (
            <StoryTile
              key={raw.id}
              story={uiStory}
              onOpenstory={() => {
                setActiveStory(uiStory);
                setStoryPortalOpen(true);
              }}
            />
          );
        })}
      </div>
      <div>
        {posts.map((post) => {
          const savedEntry = savedPosts.find(
            (s) => String(s.postId) === String(post.id),
          );
          return (
            <PostDisplayCard
              key={post.id}
              post={post}
              setPosts={setPosts}
              liked={(post.likes || []).includes(loggedInUser?.id)}
              saved={!!savedEntry}
              savedEntry={savedEntry || null}
              setSavedPosts={setSavedPosts}
            />
          );
        })}
      </div>
      {storyPortalOpen && activeStory && (
        <StoryPortal
          story={activeStory}
          duration={activeStory.duration}
          onClose={() => {
            setStoryPortalOpen(false);
            setActiveStory(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;
