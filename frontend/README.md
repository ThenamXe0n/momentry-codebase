# Momentry

**Momentry** is an Instagram-style social feed built with **React**, **Vite**, **Tailwind CSS**, and **Redux**. Users can sign up, browse a home feed, publish posts, like and comment, save posts, manage follow requests and follows, receive notifications, and share **stories** from people they follow.

The app talks to a local **[json-server](https://github.com/typicode/json-server)** REST API backed by `database.json` (no separate backend server code in this repo).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the API** (required for login, posts, stories, and all data)

   ```bash
   npm run server
   ```

   This runs json-server on **http://localhost:8000** and watches `database.json` for changes.

3. **Start the web app** (in a second terminal)

   ```bash
   npm run dev
   ```

   Vite prints a local URL (typically **http://localhost:5173**). Open it in your browser.

4. **Optional:** build for production and preview the static output.

   ```bash
   npm run build
   npm run preview
   ```

## Configuration

- **API base URL:** `http://localhost:8000` (see `src/services/axiosInstance.js`). Change it if you run json-server on another host or port.
- **JSON server:** port and file are set in `package.json` under the `server` script (`--port 8000`, `database.json`).

## Scripts

| Script        | Description                                      |
| ------------- | ------------------------------------------------ |
| `npm run dev` | Start Vite dev server with HMR                   |
| `npm run build` | Production build                               |
| `npm run preview` | Serve the production build locally           |
| `npm run server` | Start json-server API (`database.json`)      |
| `npm run lint` | Run ESLint                                     |

## API documentation

See **[apidocumentation.md](./apidocumentation.md)** for routes, query parameters, and example payloads used by this project.

## Tech stack

- React 19, React Router 7, Redux Toolkit, React Hook Form  
- Vite 7, Tailwind CSS 4  
- Axios, json-server  
