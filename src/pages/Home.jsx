import React from "react";
import { stories } from "../data/data";
import StoryTile from "../component/StoryTile";
import usePostHook from "../hooks/usePostHook";
import PostDisplayCard from "../component/PostDisplayCard";

const Home = ({ open, setOpen,setStoryIndex }) => {
   const { loading, posts, setPosts } = usePostHook();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))

  return (
    <div className="w-full overflow-x-scroll">
      <div className="px-2 flex items-center gap-2 w-fit py-2">
        {stories.map((story,idx) => (
          <StoryTile
            onOpenstory={() => {
              setStoryIndex(idx);
              setOpen(true);
            }}
            key={story.id}
            story={story}
          />
        ))}
      </div>
      <div>
        {posts.map((post) => (
          <PostDisplayCard
            key={post.id}
            post={post}
            setPosts={setPosts}
            liked={(post.likes || []).includes(loggedInUser.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
