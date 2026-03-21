import React from "react";
import { stories } from "../data/data";
import StoryTile from "../component/StoryTile";

const Home = ({ open, setOpen,setStoryIndex }) => {
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
    </div>
  );
};

export default Home;
