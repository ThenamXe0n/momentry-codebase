# API documentation

This project uses **[json-server](https://github.com/typicode/json-server)** to expose a REST API from **`database.json`**. The React app calls it via Axios with base URL **`http://localhost:8000`** (`src/services/axiosInstance.js`).

Unless noted, requests and responses use **`Content-Type: application/json`**. Responses follow json-server behavior: collections return arrays; single resources return objects; created resources include generated `id` when omitted.

---

## Base URL

```
http://localhost:8000
```

---

## Resources overview

| Resource           | Path               | Purpose |
| ------------------ | ------------------ | ------- |
| Users              | `/users`           | Accounts, profile fields |
| Posts              | `/posts`           | Feed posts, likes, comments |
| Notifications      | `/notifications`   | Activity for a user |
| Saved posts        | `/savedPosts`      | Bookmarks per user |
| Follow requests    | `/followRequests`  | Pending/accepted requests |
| Follows            | `/follows`         | Accepted follow relationships |
| Stories            | `/stories`         | Story items |
| Messages           | `/messages`        | Direct messages between two users |

---

## Users (`/users`)

### List users

- **GET** `/users`
- **Response:** `200` — array of user objects.

### Filter by email (login lookup)

- **GET** `/users?email={email}`
- **Query:** `email` — exact match (used by the app to find one user for login).
- **Response:** `200` — array (0 or 1 user in normal use).

### Get user by ID

- **GET** `/users/:id`
- **Response:** `200` — user object.  
- **Note:** The client may strip `password` before displaying (`fetchUserDetailsbyIdAPI`).

### Create user (registration)

- **POST** `/users`
- **Body:** JSON object, for example:

  ```json
  {
    "email": "user@example.com",
    "password": "your-password",
    "fullName": "Full Name",
    "username": "handle",
    "profilePic": "https://...",
    "bio": "Short bio"
  }
  ```

- **Response:** `201` — created user (including `id`).

### Update user

- **PUT** `/users/:id` (or **PATCH** for partial updates if you extend usage)
- **Body:** full or partial user fields as JSON.
- **Response:** `200` — updated user.

### Delete user

- **DELETE** `/users/:id`
- **Response:** `200` or `204` per json-server defaults.

**User object (typical fields in `database.json`):** `id`, `email`, `password`, `fullName`, `username`, `profilePic`, `bio`.

---

## Posts (`/posts`)

### List all posts

- **GET** `/posts`
- **Response:** `200` — array of posts.

### Get post by ID

- **GET** `/posts/:id`
- **Response:** `200` — single post.

### Filter posts by author

- **GET** `/posts?userId={userId}`
- **Response:** `200` — posts where `userId` matches.

### Create post

- **POST** `/posts`
- **Body:** JSON, for example:

  ```json
  {
    "image": "https://...",
    "caption": "Text",
    "userId": "user-id",
    "userDetails": {
      "username": "handle",
      "profilePic": "https://..."
    },
    "likes": [],
    "comments": []
  }
  ```

- **Response:** `201` — created post.

### Update post (likes or comments)

The app updates likes and comments with **PATCH** on the same post id.

- **PATCH** `/posts/:id`
- **Body examples:**
  - Likes: `{ "likes": ["userId1", "userId2"] }`
  - Comments: `{ "comments": [ /* array of comment objects */ ] }`

- **Response:** `200` — updated post.

**Post object (typical):** `id`, `image`, `caption`, `userId`, `userDetails`, `likes` (array of user ids), `comments` (array of objects with fields such as `username`, `comment`, `profilePic`, `userId`, `createAt`).

---

## Notifications (`/notifications`)

### List notifications (optionally filtered)

- **GET** `/notifications`
- **GET** `/notifications?receiverId={userId}` — used by the app to load notifications for a recipient.

**Note:** Sample data may include both `receiverId` and `recipientId` on different rows; align new records with the query field your client uses (`receiverId` in `fetchNotificationsForReceiverAPI`).

### Create notification

- **POST** `/notifications`
- **Body:** JSON (examples include `type`, `message`, `actorId`, `receiverId`, `postId`, `postImage`, `createdAt`, `status`, `followRequestId`, etc., depending on notification type).

### Update notification

- **PATCH** `/notifications/:id`
- **Body:** partial object.
- **Response:** `200` — updated notification.

### Delete notification

- **DELETE** `/notifications/:id`

---

## Saved posts (`/savedPosts`)

### List saved posts (filtered by user)

- **GET** `/savedPosts?userId={userId}`
- **Response:** `200` — array of saved-post records (often mirroring post fields plus metadata).

### Create saved post

- **POST** `/savedPosts`
- **Body:** JSON including at least `userId`, `postId`, and typically denormalized post fields (`image`, `caption`, `userDetails`, `likes`, `comments`, `savedAt`, etc., as in `database.json`).

### Delete saved post

- **DELETE** `/savedPosts/:id`
- **Response:** success per json-server.

---

## Follow requests (`/followRequests`)

### List follow requests (with filters)

- **GET** `/followRequests`
- **GET** `/followRequests?senderId={id}` or `?receiverId={id}` (and similar) — json-server supports query params on fields present in the stored objects.

### Create follow request

- **POST** `/followRequests`
- **Body example:**

  ```json
  {
    "senderId": "user-a",
    "receiverId": "user-b",
    "status": "pending",
    "createdAt": "2026-03-26T12:00:00.000Z"
  }
  ```

### Update follow request (e.g. accept / reject)

- **PATCH** `/followRequests/:id`
- **Body:** partial fields such as `{ "status": "accepted" }`.

### Delete follow request

- **DELETE** `/followRequests/:id`

---

## Follows (`/follows`)

Represents an accepted follow edge (follower → followed).

### List follows (with filters)

- **GET** `/follows`
- **GET** `/follows?senderId={userId}` — used to find who the user follows (`fetchFollowsAPI` / story feed).

### Create follow

- **POST** `/follows`
- **Body example:**

  ```json
  {
    "senderId": "follower-id",
    "receiverId": "followed-id",
    "createdAt": "2026-03-26T12:00:00.000Z"
  }
  ```

### Delete follow

- **DELETE** `/follows/:id`

---

## Stories (`/stories`)

### List all stories

- **GET** `/stories`
- **Response:** `200` — array of story objects.

### Get story by ID

- **GET** `/stories/:id`

### Create story

- **POST** `/stories`
- **Body example:**

  ```json
  {
    "userId": "user-id",
    "image": "https://...",
    "caption": "",
    "userDetails": {
      "username": "handle",
      "profilePic": "https://..."
    },
    "duration": 5000,
    "createdAt": "2026-03-26T15:00:00.000Z"
  }
  ```

### Update / delete story

- **PATCH** `/stories/:id` — partial update.  
- **DELETE** `/stories/:id` — delete.

---

## Messages (`/messages`)

Direct messages between users. There is **no WebSocket**; the UI uses **REST only** (`POST` to send, `GET` to load). Other browsers or tabs **do not** receive live updates until they **fetch again** (navigation, remount, manual refresh, or any polling you add later).

### List all messages

- **GET** `/messages`
- **Response:** `200` — array of message objects.

The app often loads the full collection and **filters in JavaScript** (see helpers below), because json-server does not support arbitrary OR queries in one request.

### Get message by ID

- **GET** `/messages/:id`
- **Response:** `200` — single message.

### Create message (send)

- **POST** `/messages`
- **Body example:**

  ```json
  {
    "senderId": "logged-in-user-id",
    "receiverId": "peer-user-id",
    "text": "Message body",
    "createdAt": "2026-03-26T16:00:00.000Z"
  }
  ```

- **Response:** `201` — created message (json-server may assign `id` if omitted).

### Update / delete message

- **PATCH** `/messages/:id` — partial update (optional; not required by the current chat UI).
- **DELETE** `/messages/:id` — delete.

**Message object (typical):** `id`, `senderId`, `receiverId`, `text`, `createdAt`.

**UI routes (React, not json-server):**

- Inbox: `/messages`
- Chat with a user: `/messages/:peerId` (see `pagePaths.messageChatWith`).

---

## Client-side helpers (not HTTP routes)

These are implemented in **`src/services/apiCollection.js`** using multiple API calls:

| Behavior | Description |
| -------- | ----------- |
| **Login** | `GET /users?email=...` then password check in the browser; session is stored in `localStorage`, not server sessions. |
| **Story feed for logged-in user** | Loads `GET /follows?senderId={loggedInUserId}`, then `GET /stories`, filters to followed users, and keeps the latest story per user in JavaScript. |
| **Messages for inbox** | `GET /messages`, then filter rows where `senderId === userId` **or** `receiverId === userId`; group by peer and keep latest preview per conversation (`fetchMessagesForUserAPI` + `useConversationsHook`). |
| **Messages in a thread** | `GET /messages`, then filter rows where `(senderId, receiverId)` is the pair `(userId, peerId)` or `(peerId, userId)`, sort by `createdAt` (`fetchMessagesBetweenUsersAPI` + `useChatThreadHook`). |
| **Send message** | `POST /messages` with `senderId`, `receiverId`, `text`, `createdAt`; then the client reloads the thread via `fetchMessagesBetweenUsersAPI`. |

---

## Error handling

json-server returns conventional HTTP status codes (for example `404` for unknown ids). The app’s API wrappers often catch errors and throw a generic message; when debugging, inspect the browser network tab and the json-server terminal output.

---

## Related files

- **`src/services/apiPaths.js`** — path helpers for resources and ids.  
- **`src/services/apiCollection.js`** — Axios calls used by the UI.  
- **`database.json`** — seed data and schema reference for each collection.
