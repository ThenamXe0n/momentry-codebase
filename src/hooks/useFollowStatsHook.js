import { useCallback, useEffect, useState } from "react";
import { fetchFollowsAPI } from "../services/apiCollection";

export default function useFollowStatsHook(userId) {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const reloadFollowStats = useCallback(async () => {
    if (!userId) {
      setFollowersCount(0);
      setFollowingCount(0);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const followers = await fetchFollowsAPI({ receiverId: userId });
      const following = await fetchFollowsAPI({ senderId: userId });
      setFollowersCount(followers?.length || 0);
      setFollowingCount(following?.length || 0);
    } catch (error) {
      console.log(error);
      setFollowersCount(0);
      setFollowingCount(0);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    reloadFollowStats();
  }, [reloadFollowStats]);

  return { followersCount, followingCount, loading, reloadFollowStats };
}
