import React from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { uploadStoryAPI } from "../../services/apiCollection";

const StoryUploadForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  async function handleUploadStory(data) {
    const payload = {
      image: data.image,
      caption: data.caption || "",
      duration: data.duration ? Number(data.duration) : 5000,
      userId: loggedInUser.id,
      userDetails: {
        profilePic: loggedInUser.profilePic,
        username: loggedInUser.username,
      },
      createdAt: new Date().toISOString(),
    };
    try {
      await uploadStoryAPI(payload);
      alert("Story uploaded successfully");
    } catch (error) {
      console.log(error?.message);
      alert("Failed to upload story");
    }
  }

  return (
    <div className="w-full max-w-[350px] mx-auto flex flex-col items-center">
      <div className="w-full bg-white border border-neutral-200 rounded-lg p-8 mb-4">
        <div className="flex justify-center items-center gap-2 mb-8">
          <Upload />
          <span className="text-md font-medium uppercase">Upload story</span>
        </div>

        <form
          onSubmit={handleSubmit(handleUploadStory)}
          className="flex flex-col gap-3"
        >
          <div>
            <label htmlFor="story-image" className="py-2 text-md font-bold">
              Story image
            </label>
            <input
              id="story-image"
              type="url"
              placeholder="Paste image URL"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
              aria-invalid={errors.image ? "true" : "false"}
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="story-caption" className="py-2 text-md font-bold">
              Caption (optional)
            </label>
            <input
              id="story-caption"
              type="text"
              placeholder="Caption"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
              {...register("caption")}
            />
          </div>

          <div>
            <label htmlFor="story-duration" className="py-2 text-md font-bold">
              Duration (ms, optional)
            </label>
            <input
              id="story-duration"
              type="number"
              placeholder="5000"
              min={2000}
              max={30000}
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
              {...register("duration")}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-1 text-sm font-semibold text-white bg-[#0095f6] hover:bg-[#1877f2] disabled:opacity-60 disabled:pointer-events-none rounded-lg transition-colors"
          >
            {isSubmitting ? "Uploading…" : "Upload story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoryUploadForm;
