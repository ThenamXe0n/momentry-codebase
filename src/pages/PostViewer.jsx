import { Info } from "lucide-react";
import { pagePaths } from "../router/pagePaths";
import { useEffect, useState } from "react";
import { fetchPostByIdAPI } from "../services/apiCollection";
import { Link, useParams } from "react-router";
import PostDisplayCard from "../component/PostDisplayCard";

export default function PostViewer() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sessionUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  async function loadPost() {
    setPost(null);
    setHasLoaded(false);
    try {
      const data = await fetchPostByIdAPI(id);
      setPost(data);
    } catch (error) {
      setPost(null);
      console.log(error);
    } finally {
      setHasLoaded(true);
    }
  }

  useEffect(() => {
    loadPost();
  }, [id]);

  function setPosts(updater) {
    setPost((prev) => {
      if (!prev) return null;
      const list = [prev];
      const next = typeof updater === "function" ? updater(list) : updater;
      return Array.isArray(next) && next.length > 0 ? next[0] : prev;
    });
  }

  return (
    <div className="p-4 w-full">
      {!hasLoaded && (
        <p className="text-sm text-neutral-500 py-6 text-center">Loading…</p>
      )}
      {hasLoaded && post ? (
        <PostDisplayCard
          post={post}
          setPosts={setPosts}
          liked={(post.likes || []).includes(sessionUser?.id)}
        />
      ) : null}
      {hasLoaded && !post ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="w-11/12 p-5 rounded-md flex items-center bg-neutral-100 justify-center flex-col gap-6">
            <p className="text-neutral-400 capitalize flex items-center justify-center gap-2">
              <Info />
              Post not found or unavailable
            </p>
            <Link
              to={pagePaths.home}
              className="px-3 py-1 rounded-md flex gap-2 items-center justify-center bg-blue-600 text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
