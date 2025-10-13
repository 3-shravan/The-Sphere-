import {
  ForgetPassword,
  Login,
  Register,
  ResetPasswordViaEmail,
  ResetPasswordViaPhone,
} from "@features/auth";
import { Profile } from "@features/users";
import { Toast } from "@lib/Toast";
import { Route, Routes } from "react-router-dom";
import {
  NonExistRoutes,
  Offline,
  ProtectedRoutes,
  PublicRoutes,
} from "@/components";
import { CreatePost, SavedPosts } from "@/features/posts";
import { FeedLayout, HomePage } from "@/layouts";
import PostProviderWrapper from "./components/routing/PostProviderWrapper";
import Chat from "./features/chat/pages/Conversations";
import Explore from "./features/explore/pages/Explore";
import Page from "./features/landing-page/pages/Page";
import ViewPost from "./features/posts/pages/ViewPost";
import useNetworkStatus from "./hooks/useNetworkStatus";

export default function App() {
  const isOnline = useNetworkStatus();
  if (!isOnline) return <Offline />;

  return (
    <>
      <Toast />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Page />} />
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
              <Route path="c" element={<Chat />} />
              <Route path="profile/:username" element={<Profile />} />
            </Route>
          </Route>
        </Route>

        {/* Shared Routes */}
        <Route path="/post/:postId" element={<ViewPost />} />
        <Route path="*" element={<NonExistRoutes />} />
      </Routes>
    </>
  );
}
