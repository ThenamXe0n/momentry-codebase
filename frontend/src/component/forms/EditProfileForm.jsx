import React from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { updateUserAPI } from "../../services/apiCollection";

const EditProfileForm = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      profilePic: loggedInUser?.profilePic || "",
      fullName: loggedInUser?.fullName || "",
      username: loggedInUser?.username || "",
      bio: loggedInUser?.bio || "",
    },
  });

  async function handleUpdateProfile(data) {
    const payload = {
      ...loggedInUser,
      ...data,
    };

    try {
      await updateUserAPI(payload,loggedInUser.id);

      // update localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(payload));

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error?.message);
      alert("Failed to update profile");
    }
  }

  return (
    <div className="w-full max-w-[350px] mx-auto flex flex-col items-center">
      {/* Card */}
      <div className="w-full bg-white border border-neutral-200 rounded-lg p-8 mb-4">
        {/* Header */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <Upload />
          <span className="text-md font-medium uppercase">Edit Profile</span>
        </div>

        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="flex flex-col gap-3"
        >
          {/* Profile Pic */}
          <div>
            <label className="py-2 text-md font-bold">Profile Image URL</label>
            <input
              type="url"
              placeholder="paste image url"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none focus:border-neutral-400"
              {...register("profilePic", {
                required: "Profile image is required",
              })}
            />
            {errors.profilePic && (
              <p className="text-xs text-red-500">
                {errors.profilePic.message}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="py-2 text-md font-bold">Full Name</label>
            <input
              type="text"
              placeholder="enter full name"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none"
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="py-2 text-md font-bold">Username</label>
            <input
              type="text"
              placeholder="enter username"
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="py-2 text-md font-bold">Bio</label>
            <textarea
              placeholder="write your bio..."
              className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none resize-none"
              rows={3}
              {...register("bio")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 mt-2 text-sm font-semibold text-white bg-[#0095f6] hover:bg-[#1877f2] disabled:opacity-60 rounded-lg"
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
