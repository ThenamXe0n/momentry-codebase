import { Link } from "react-router";
import moment from "moment";
import { pagePaths } from "../../router/pagePaths";

export default function ConversationRow({ peerId, peer, lastText, lastAt }) {
  const username = peer?.username || "User";
  const avatar = peer?.profilePic || "/assets/noprofile.avif";

  return (
    <Link
      to={pagePaths.messageChatWith(peerId)}
      className="flex items-center gap-3 p-3 border-b border-neutral-100 hover:bg-neutral-50 active:bg-neutral-100"
    >
      <div className="size-12 rounded-full overflow-hidden border border-neutral-200 shrink-0">
        <img src={avatar} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{username}</p>
        <p className="text-xs text-neutral-500 truncate">{lastText}</p>
      </div>
      <span className="text-[10px] text-neutral-400 shrink-0">
        {lastAt ? moment(lastAt).fromNow() : ""}
      </span>
    </Link>
  );
}
