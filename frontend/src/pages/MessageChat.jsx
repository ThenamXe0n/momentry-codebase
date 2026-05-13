import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import { pagePaths } from "../router/pagePaths";
import { fetchUserDetailsbyIdAPI } from "../services/apiCollection";
import useChatThreadHook from "../hooks/useChatThreadHook";
import ChatBox from "../component/messages/ChatBox";

export default function MessageChat() {
  const { peerId } = useParams();
  const sessionUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const [peer, setPeer] = useState(null);

  const { messages, loading, sending, sendMessage } = useChatThreadHook(
    sessionUser?.id,
    peerId,
  );

  useEffect(() => {
    if (!peerId) return;
    let cancelled = false;
    fetchUserDetailsbyIdAPI(peerId)
      .then((u) => {
        if (!cancelled) setPeer(u);
      })
      .catch(() => {
        if (!cancelled) setPeer(null);
      });
    return () => {
      cancelled = true;
    };
  }, [peerId]);

  if (!sessionUser?.id) {
    return (
      <div className="p-4">
        <p className="text-sm text-neutral-500">Sign in to chat.</p>
      </div>
    );
  }

  if (peerId === sessionUser.id) {
    return (
      <div className="p-4">
        <Link to={pagePaths.messages} className="text-blue-600 text-sm">
          ← Back
        </Link>
        <p className="mt-2 text-neutral-500 text-sm">You cannot message yourself.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-1 px-1 py-2 border-b border-neutral-200 shrink-0 bg-white">
        <Link
          to={pagePaths.messages}
          className="p-2 rounded-full hover:bg-neutral-100"
          aria-label="Back to inbox"
        >
          <ChevronLeft className="size-6" />
        </Link>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <img
            src={peer?.profilePic || "/assets/noprofile.avif"}
            className="size-9 rounded-full object-cover border border-neutral-200"
            alt=""
          />
          <span className="font-semibold truncate">
            {peer?.username || "…"}
          </span>
        </div>
      </div>
      <ChatBox
        messages={messages}
        loading={loading}
        sending={sending}
        sendMessage={sendMessage}
        sessionUserId={sessionUser.id}
      />
    </div>
  );
}
