import moment from "moment";

export default function MessageBubble({ text, createdAt, isOwn }) {
  return (
    <div
      className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-sm"
            : "bg-neutral-200 text-neutral-900 rounded-bl-sm"
        }`}
      >
        <p className="break-words whitespace-pre-wrap">{text}</p>
        <p
          className={`text-[10px] mt-1 ${
            isOwn ? "text-blue-100" : "text-neutral-500"
          }`}
        >
          {createdAt ? moment(createdAt).format("h:mm A") : ""}
        </p>
      </div>
    </div>
  );
}
