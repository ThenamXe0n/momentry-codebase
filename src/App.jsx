import { Route, Routes } from "react-router";
import "./App.css";
import AccoutLayout from "./layouts/AccoutLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Post from "./pages/Post";
import SavePost from "./pages/SavePost";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { pagePaths } from "./router/pagePaths";
import ProtectedRoute from "./router/ProtectedRoute";
import { useState } from "react";
import StoryPortal from "./portal/StoryPortal";
import { stories } from "./data/data";
import ModalPopup from "./portal/ModalPopup";
import EditProfileForm from "./component/forms/EditProfileForm";
import { useSelector } from "react-redux";
import UserProfileViewer from "./pages/UserProfileViewer";
import PostViewer from "./pages/PostViewer";

function App() {
  const [open, setOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const loginStatus = localStorage.getItem("loginStatus") === "loggedIn";
  const {popupOpen,modal} =useSelector((state)=>state.togglers)

  return (
    <section className="max-w-md mx-auto shadow-neutral-400 shadow-lg  w-full min-h-screen">
      <Routes>
        <Route
          path={pagePaths.home}
          element={
            <ProtectedRoute isLoggedIn={loginStatus}>
              <AccoutLayout open={open} setOpen={setOpen} />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Home
                setStoryIndex={setStoryIndex}
                open={open}
                setOpen={setOpen}
              />
            }
          />
          <Route path={pagePaths.messages} element={<Messages />} />
          <Route path={pagePaths.notifications} element={<Notifications />} />
          <Route path={pagePaths.explore} element={<Explore />} />
          <Route path={pagePaths.viewPost} element={<PostViewer />} />
          <Route path={pagePaths.post} element={<Post />} />
          <Route path={pagePaths.savePost} element={<SavePost />} />
          <Route path={pagePaths.profile} element={<Profile />} />
          <Route path={pagePaths.viewProfile} element={<UserProfileViewer />} />
          <Route path={pagePaths.settings} element={<Settings />} />
        </Route>
        <Route path={pagePaths.login} element={<Login />} />
        <Route path={pagePaths.register} element={<Register />} />
      </Routes>
      {open && (
        <StoryPortal
          story={stories[storyIndex]}
          onClose={() => setOpen(false)}
        ></StoryPortal>
      )}
     {popupOpen && <ModalPopup>
        {modal}
      </ModalPopup>}
    </section>
  );
}

export default App;
