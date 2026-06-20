import { useCallback, useEffect, useState } from "react";
import { fetchFollowRequestsAPI, fetchFollowsAPI } from "../services/apiCollection";

export default function useFollowRelationshipHook(profileUserId, sessionUserId) {
  const [loading, setLoading] = useState(true);
  const [kind, setKind] = useState("none");
  const [outgoingRequestId, setOutgoingRequestId] = useState(null);

  const reload = useCallback(async () => {
    if (!profileUserId || !sessionUserId) {
      setLoading(false);
      setKind("none");
      setOutgoingRequestId(null);
      return;
    }
    if (profileUserId === sessionUserId) {
      setLoading(false);
      setKind("self");
      setOutgoingRequestId(null);
      return;
    }
    setLoading(true);
    try {
      const pending = await fetchFollowRequestsAPI({
        senderId: sessionUserId,
        receiverId: profileUserId,
        status: "pending",
      });
      if (pending?.length) {
        setKind("pending_sent");
        setOutgoingRequestId(pending[0].id);
        return;
      }
      const follows = await fetchFollowsAPI({
        senderId: sessionUserId,
        receiverId: profileUserId,
      });
      if (follows?.length) {
        setKind("following");
        setOutgoingRequestId(null);
        return;
      }
      setKind("none");
      setOutgoingRequestId(null);
    } catch (error) {
      console.log(error);
      setKind("none");
      setOutgoingRequestId(null);
    } finally {
      setLoading(false);
    }
  }, [profileUserId, sessionUserId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { loading, kind, outgoingRequestId, reload };
}
