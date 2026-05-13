import { useEffect, useState } from "react";
import { fetchStoriesFeedForUserAPI } from "../services/apiCollection";

function useStoryFeedHook(userId) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadStories() {
    if (!userId) {
      setStories([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchStoriesFeedForUserAPI(userId);
      setStories(data);
    } catch (error) {
      console.log(error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStories();
  }, [userId]);

  return { stories, loading, reloadStories: loadStories };
}

export default useStoryFeedHook;
