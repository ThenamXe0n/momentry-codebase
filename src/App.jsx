import { Route, Routes } from "react-router";
import "./App.css";
import AccoutLayout from "./layouts/AccoutLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MessagesLayout from "./pages/MessagesLayout";
import MessagesInbox from "./pages/MessagesInbox";
import MessageChat from "./pages/MessageChat";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Post from "./pages/Post";
import Story from "./pages/Story";
import SavePost from "./pages/SavePost";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { pagePaths } from "./router/pagePaths";
import ProtectedRoute from "./router/ProtectedRoute";
import ModalPopup from "./portal/ModalPopup";
import { useSelector } from "react-redux";
import UserProfileViewer from "./pages/UserProfileViewer";
import PostViewer from "./pages/PostViewer";

function App() {
  const loginStatus = localStorage.getItem("loginStatus") === "loggedIn";
  const { popupOpen, modal } = useSelector((state) => state.togglers);

  return (
    <section className="max-w-md mx-auto shadow-neutral-400 shadow-lg  w-full min-h-screen">
      <Routes>
        <Route
          path={pagePaths.home}
          element={
            <ProtectedRoute isLoggedIn={loginStatus}>
              <AccoutLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="messages" element={<MessagesLayout />}>
            <Route index element={<MessagesInbox />} />
            <Route path=":peerId" element={<MessageChat />} />
          </Route>
          <Route path={pagePaths.notifications} element={<Notifications />} />
          <Route path={pagePaths.explore} element={<Explore />} />
          <Route path={pagePaths.viewPost} element={<PostViewer />} />
          <Route path={pagePaths.post} element={<Post />} />
          <Route path={pagePaths.story} element={<Story />} />
          <Route path={pagePaths.savePost} element={<SavePost />} />
          <Route path={pagePaths.profile} element={<Profile />} />
          <Route path={pagePaths.viewProfile} element={<UserProfileViewer />} />
          <Route path={pagePaths.settings} element={<Settings />} />
        </Route>
        <Route path={pagePaths.login} element={<Login />} />
        <Route path={pagePaths.register} element={<Register />} />
      </Routes>
      {popupOpen && <ModalPopup>{modal}</ModalPopup>}
    </section>
  );
}

export default App;
