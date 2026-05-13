import { useCallback, useEffect, useState } from "react";
import {
  fetchMessagesForUserAPI,
  fetchUserDetailsbyIdAPI,
} from "../services/apiCollection";

function buildConversationSummaries(userId, messages) {
  const map = new Map();
  for (const m of messages) {
    const peerId = m.senderId === userId ? m.receiverId : m.senderId;
    const t = new Date(m.createdAt || 0).getTime();
    const cur = map.get(peerId);
    if (!cur || t > new Date(cur.lastAt).getTime()) {
      map.set(peerId, {
        peerId,
        lastText: m.text,
        lastAt: m.createdAt,
      });
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.lastAt) - new Date(a.lastAt),
  );
}

export default function useConversationsHook(userId) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadConversations = useCallback(async () => {
    if (!userId) {
      setConversations([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const msgs = await fetchMessagesForUserAPI(userId);
      const summaries = buildConversationSummaries(userId, msgs);
      const withPeers = await Promise.all(
        summaries.map(async (s) => {
          try {
            const peer = await fetchUserDetailsbyIdAPI(s.peerId);
            return { ...s, peer };
          } catch {
            return { ...s, peer: null };
          }
        }),
      );
      setConversations(withPeers);
    } catch (error) {
      console.log(error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    reloadConversations();
  }, [reloadConversations]);

  return { conversations, loading, reloadConversations };
}
