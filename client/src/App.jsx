import { Toast } from "@lib/Toast";
import { Routes, Route } from "react-router-dom";
import {
  PublicRoutes,
  ProtectedRoutes,
  NonExistRoutes,
  Offline,
} from "@/components";
import { FeedLayout, HomePage, LandingPage } from "@/layouts";
import { CreatePost, SavedPosts } from "@/features/posts";
import { Profile } from "@features/users";
import {
  Login,
  Register,
  ForgetPassword,
  ResetPasswordViaEmail,
  ResetPasswordViaPhone,
} from "@features/auth";

import useNetworkStatus from "./hooks/useNetworkStatus";
import PostProviderWrapper from "./components/routing/PostProviderWrapper";
import Explore from "./features/explore/pages/Explore";
import Chat from "./features/chat/pages/Conversations";
import ViewPost from "./features/posts/pages/ViewPost";

export default function App() {
  const isOnline = useNetworkStatus();
  if (!isOnline) return <Offline />;

  return (
    <>
      {/* <ReactLenis root> */}
      <Toast />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/reset-password/phone/:phoneNumber"
            element={<ResetPasswordViaPhone />}
          />
          <Route
            path="/reset-password/email/:token"
            element={<ResetPasswordViaEmail />}
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<PostProviderWrapper />}>
            <Route path="/" element={<FeedLayout />}>
              <Route path="feeds" element={<HomePage />} />
              <Route path="saved" element={<SavedPosts />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="explore" element={<Explore />} />
              <Route path="conversations" element={<Chat />} />
              <Route path="profile/:username" element={<Profile />} />
            </Route>
          </Route>
        </Route>

        {/* Shared Routes */}
        <Route path="/post/:postId" element={<ViewPost />} />

        {/* Catch All */}
        <Route path="*" element={<NonExistRoutes />} />
      </Routes>
      {/* </ReactLenis> */}
    </>
  );
}
