import { useEffect, useState } from "react";
import { fetchAllPostAPI } from "../services/apiCollection";

function usePostHook() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadAllPost() {
    try {
      let response = await fetchAllPostAPI();
      setPosts(response);
      setLoading(false);
    } catch (error) {
      alert("failed to load post. check your internet connection.");
      console.log(error);
      setLoading(false);
      setError(JSON.stringify(error.message));
      setPosts([]);
    }
  }

  useEffect(() => {
    loadAllPost();
  }, []);

  return { posts, loading, error, setPosts };
}

export default usePostHook;
