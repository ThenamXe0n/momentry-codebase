import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function ChatBox({
  messages,
  loading,
  sending,
  sendMessage,
  sessionUserId,
}) {
  const bottomRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function submitMessage() {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setText("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitMessage();
  }

  return (
    <div className="flex flex-col h-full min-h-0 flex-1">
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {loading && (
          <div className="flex justify-center py-8 text-neutral-500 gap-2">
            <LoaderCircle className="animate-spin size-5" />
            Loading…
          </div>
        )}
        {!loading && messages.length === 0 && (
          <p className="text-center text-sm text-neutral-500 py-8">
            No messages yet. Say hello.
          </p>
        )}
        {!loading &&
          messages.map((m) => (
            <MessageBubble
              key={m.id}
              text={m.text}
              createdAt={m.createdAt}
              isOwn={m.senderId === sessionUserId}
            />
          ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-neutral-200 p-2 flex gap-2 items-end bg-white shrink-0"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          placeholder="Message…"
          className="flex-1 resize-none rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-blue-400 max-h-24"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitMessage();
            }
          }}
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="shrink-0 p-2 rounded-full bg-blue-500 text-white disabled:opacity-50"
          aria-label="Send"
        >
          {sending ? (
            <LoaderCircle className="animate-spin size-5" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>
    </div>
  );
}
