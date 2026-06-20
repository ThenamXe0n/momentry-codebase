import { Info } from "lucide-react";
import ConversationRow from "./ConversationRow";

export default function ConversationList({ conversations, loading }) {
  if (loading) {
    return (
      <p className="p-4 text-sm text-neutral-500 text-center">Loading…</p>
    );
  }

  if (!conversations?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <Info className="size-10 text-neutral-300 mb-2" />
        <p className="text-sm text-neutral-500">
          No conversations yet. Open someone&apos;s profile and tap Message to
          start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-100">
      {conversations.map((c) => (
        <ConversationRow
          key={c.peerId}
          peerId={c.peerId}
          peer={c.peer}
          lastText={c.lastText}
          lastAt={c.lastAt}
        />
      ))}
    </div>
  );
}
