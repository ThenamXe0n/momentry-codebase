const StoryTile = ({
  story,
  profilePic,
  mystory = false,
  onOpenstory,
  displayName = true,
}) => {
  return (
    <div
      onClick={onOpenstory}
      className="flex size-24 flex-col items-center relative "
    >
      <div className="size-20 flex items-center overflow-visible justify-center rounded-full  border-3 border-gray-500/30">
        <img
          src={
            (story && story?.user?.avatar) ||
            profilePic ||
            "/assets/noprofile.avif"
          }
          alt="story"
          className="size-20 rounded-full object-cover"
        />
      </div>
      {mystory && (
        <div className="size-4 bg-white flex items-center justify-center absolute rounded-full bottom-6 right-2 border-3 border-gray-500/30">
          +
        </div>
      )}
      {displayName && (
        <p className="truncate max-w-24 text-xs ">
          {story?.user.name || "nameet mandwal"}
        </p>
      )}
    </div>
  );
};

export default StoryTile;
