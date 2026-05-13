import useConversationsHook from "../hooks/useConversationsHook";
import ConversationList from "../component/messages/ConversationList";

export default function MessagesInbox() {
  const sessionUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const { conversations, loading } = useConversationsHook(sessionUser?.id);

  if (!sessionUser?.id) {
    return (
      <div className="p-4">
        <h1 className="text-lg font-semibold">Messages</h1>
        <p className="mt-2 text-sm text-neutral-500">Sign in to view messages.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <h1 className="text-lg font-semibold px-4 py-3 border-b border-neutral-200 shrink-0">
        Messages
      </h1>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <ConversationList conversations={conversations} loading={loading} />
      </div>
    </div>
  );
}
