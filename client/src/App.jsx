import { ReactLenis } from "lenis/react";
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
import Explore from "@features/explore/Explore";
import { Profile } from "@features/users";
import {
  Login,
  Register,
  ForgetPassword,
  ResetPasswordViaEmail,
  ResetPasswordViaPhone,
} from "@features/auth";
import ViewPost from "./shared/pages/ViewPost";
import useNetworkStatus from "./hooks/useNetworkStatus";

const App = () => {
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

        <Route path="/post/:postId" element={<ViewPost />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<FeedLayout />}>
            <Route path="feeds" element={<HomePage />} />
            <Route path="saved" element={<SavedPosts />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="explore" element={<Explore />} />
            <Route path="profile/:username" element={<Profile />} />
          </Route>
        </Route>
        {/* Catch All */}
        <Route path="*" element={<NonExistRoutes />} />
      </Routes>
      {/* </ReactLenis> */}
    </>
  );
};

export default App;
