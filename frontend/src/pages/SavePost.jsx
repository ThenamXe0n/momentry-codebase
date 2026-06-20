import { Info } from "lucide-react";
import { Link } from "react-router";
import { pagePaths } from "../router/pagePaths";
import useSavedPostsHook from "../hooks/useSavedPostsHook";

export default function SavePost() {
  const sessionUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const { savedPosts, loading } = useSavedPostsHook(sessionUser?.id);

  const sortedSaved = [...savedPosts].sort(
    (a, b) => new Date(b.savedAt) - new Date(a.savedAt),
  );

  if (!sessionUser?.id) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">Saved posts</h1>
        <p className="mt-2 text-sm text-neutral-500">Sign in to see saved posts.</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-xl font-semibold mb-4">Saved posts</h1>

      {loading && (
        <p className="text-sm text-neutral-500 py-6 text-center">Loading…</p>
      )}

      {!loading && sortedSaved.length === 0 && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="w-11/12 p-5 rounded-md flex items-center bg-neutral-100 justify-center flex-col gap-6">
            <p className="text-neutral-400 capitalize flex items-center justify-center gap-2">
              <Info />
              No saved posts yet
            </p>
            <Link
              to={pagePaths.home}
              className="px-3 py-1 rounded-md flex gap-2 items-center justify-center bg-blue-600 text-white"
            >
              Browse feed
            </Link>
          </div>
        </div>
      )}

      {!loading && sortedSaved.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {sortedSaved.map((item) => (
            <SavedPostTile key={item.id} saved={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function SavedPostTile({ saved }) {
  return (
    <Link
      to={pagePaths.viewPostById(saved.postId)}
      className="w-full h-40 block"
    >
      <img
        className="h-full w-full object-cover object-center"
        src={
          saved?.image ||
          "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
        }
        alt={saved?.caption || ""}
      />
    </Link>
  );
}
