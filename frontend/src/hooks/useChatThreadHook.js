import { useCallback, useEffect, useState } from "react";
import {
  fetchMessagesBetweenUsersAPI,
  postMessageAPI,
} from "../services/apiCollection";

export default function useChatThreadHook(sessionUserId, peerId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const reloadMessages = useCallback(async () => {
    if (!sessionUserId || !peerId) {
      setMessages([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchMessagesBetweenUsersAPI(sessionUserId, peerId);
      setMessages(data);
    } catch (error) {
      console.log(error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [sessionUserId, peerId]);

  useEffect(() => {
    reloadMessages();
  }, [reloadMessages]);

  async function sendMessage(text) {
    const trimmed = text?.trim();
    if (!trimmed || !sessionUserId || !peerId) return;
    setSending(true);
    try {
      await postMessageAPI({
        senderId: sessionUserId,
        receiverId: peerId,
        text: trimmed,
        createdAt: new Date().toISOString(),
      });
      await reloadMessages();
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  }

  return { messages, loading, sending, sendMessage, reloadMessages };
}
