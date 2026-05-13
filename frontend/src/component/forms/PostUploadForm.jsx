import React from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { uploadPostAPI } from "../../services/apiCollection";

const PostUploadForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  async function handleUplaodPost(data) {
    let payload = {
      ...data,
      userId: loggedInUser.id,
      userDetails: {
        profilePic: loggedInUser.profilePic,
        username: loggedInUser.username,
      },
      likes: [],
      comments: [],
    };
    try {
      await uploadPostAPI(payload);
      alert("post uploaded successfully");
    } catch (error) {
      console.log(error?.message);
      alert("failed to upload post");
    }
  }

  return (
    <div className="w-full max-w-[350px] mx-auto flex flex-col items-center">
      {/* Card */}
      <div className="w-full bg-white border border-neutral-200 rounded-lg p-8 mb-4">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <Upload />
          <span className="text-md font-medium uppercase">Upload new Post</span>
        </div>

        <form
          onSubmit={handleSubmit(handleUplaodPost)}
          className="flex flex-col gap-3"
        >
          <div>
            <label htmlFor="image" className="py-2 text-md font-bold">
              Post Image
            </label>
            <input
              id="image"
              type="url"
              placeholder="paste image url"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
              aria-invalid={errors.image ? "true" : "false"}
              {...register("image", {
                required: "image is required",
              })}
            />
            {errors.image && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="caption" className="py-2 text-md font-bold">
              Post Caption
            </label>
            <input
              id="caption"
              type="caption"
              placeholder="caption (optional)"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
              aria-invalid={errors.caption ? "true" : "false"}
              {...register("caption")}
            />
            {errors.caption && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.caption.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-1 text-sm font-semibold text-white bg-[#0095f6] hover:bg-[#1877f2] disabled:opacity-60 disabled:pointer-events-none rounded-lg transition-colors"
          >
            {isSubmitting ? "Uploading..." : "Upload post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostUploadForm;
