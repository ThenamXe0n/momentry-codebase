import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import moment from "moment";
import {
  acceptFollowRequestAsync,
  fetchNotificationsAsync,
} from "../features/notificationSlice";
import { pagePaths } from "../router/pagePaths";

export default function Notifications() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.notifications);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  useEffect(() => {
    if (loggedInUser?.id) {
      dispatch(fetchNotificationsAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser?.id]);

  if (!loggedInUser) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <p className="mt-2 text-neutral-500 text-sm">Sign in to see notifications.</p>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>

      {isLoading && (
        <p className="text-sm text-neutral-500">Loading…</p>
      )}

      {error && (
        <p className="text-sm text-red-600">Could not load notifications.</p>
      )}

      {!isLoading && !error && list.length === 0 && (
        <div className="rounded-lg bg-neutral-100 p-6 text-center text-neutral-500 text-sm">
          No notifications yet. Likes, comments, follow requests, and accepted follows will show up here.
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {list.map((notification) => (
          <li
            key={notification.id}
            className="flex gap-3 flex  items-start rounded-lg border border-neutral-200 p-3 bg-white"
          >
            <Link
              to={pagePaths.viewUserProfile(notification.actorId)}
              className="shrink-0 size-11 rounded-full overflow-hidden border border-neutral-200"
            >
              <img
                src={notification.profilePic || "/assets/noprofile.avif"}
                alt=""
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="flex-1 flex justify-between items-start gap-2 min-w-0">
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug">
                  <Link
                    to={pagePaths.viewUserProfile(notification.actorId)}
                    className="font-semibold"
                  >
                    {notification.username}
                  </Link>{" "}
                  <span className="text-neutral-700">{notification.message}</span>
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {moment(notification.createdAt).fromNow()}
                </p>
                {notification.type === "follow_request" && notification.status !== "accepted" && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await dispatch(
                          acceptFollowRequestAsync({
                            notification: notification,
                            accepter: loggedInUser,
                          }),
                        ).unwrap();
                        dispatch(fetchNotificationsAsync(loggedInUser.id));
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                    className="mt-2 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded px-3 py-1.5"
                  >
                    Accept
                  </button>
                )}
                {notification.type === "follow_request" && notification.status === "accepted" && (
                  <p className="mt-2 text-xs text-neutral-500">Accepted</p>
                )}
              </div>
              {(notification.type === "like" || notification.type === "comment") &&
                notification.postImage && (
                <Link
                  to={pagePaths.viewPostById(notification.postId)}
                  className="shrink-0 inline-block size-14 rounded overflow-hidden border border-neutral-200"
                >
                  <img
                    src={notification.postImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
