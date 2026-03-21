import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const StoryPortal = ({ story, duration = 4000, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = (elapsed / duration) * 100;

      if (percent >= 100) {
        setProgress(100);
        clearInterval(interval);
        onClose();
      } else {
        setProgress(percent);
      }
    }, 50); // update every 50ms (smooth enough)

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white h-full w-full max-w-md rounded-lg shadow-lg relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div onClick={()=>onClose()} className="p-4 flex items-center fixed top-4 w-full max-w-md">
          <div className="size-12 rounded-full flex items-center justify-center">
            <img src={story?.user?.avatar} />
          </div>
          <span className="ml-2 font-semibold">{story?.user?.name}</span>
        </div>

        {/* Story Content */}
        <div className="w-full h-full flex items-center justify-center ">
          <img
            src={story?.content}
            alt="story content"
            className=" h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default StoryPortal;
