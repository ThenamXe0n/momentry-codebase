import { useEffect, useState } from "react";
import { fetchSavedPostsByUserIdAPI } from "../services/apiCollection";

function useSavedPostsHook(userId) {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(!!userId);

  async function loadSavedPosts() {
    if (!userId) {
      setSavedPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchSavedPostsByUserIdAPI(userId);
      setSavedPosts(data);
    } catch (error) {
      console.log(error);
      setSavedPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSavedPosts();
  }, [userId]);

  return { savedPosts, setSavedPosts, loading, reloadSavedPosts: loadSavedPosts };
}

export default useSavedPostsHook;
