import { Outlet } from "react-router";

export default function MessagesLayout() {
  return (
    <div className="flex flex-col h-[calc(100dvh-7rem)] min-h-0 w-full">
      <Outlet />
    </div>
  );
}
