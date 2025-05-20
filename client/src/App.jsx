import ToastConfig from "@services/ToastConfig";
import { ReactLenis } from "lenis/react";
import { PublicRoutes, ProtectedRoutes, NonExistRoutes } from "@components";
import { CreatePost, Home, SavedPosts, Explore } from "@/features/posts";
import { Routes, Route } from "@lib";
import Layout from "@layouts/websitelayout/Layout";
import FeedLayout from "@layouts/feedlayout/Layout";
import {
  Login,
  Register,
  ForgetPassword,
  ResetPasswordViaEmail,
  ResetPasswordViaPhone,
} from "@features/auth";

const App = () => {
  return (
    <>
      <ReactLenis root>
        <ToastConfig />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route
              path="/resetPassword/phone/:phoneNumber"
              element={<ResetPasswordViaPhone />}
            />
            <Route
              path="/resetPassword/email/:token"
              element={<ResetPasswordViaEmail />}
            />
          </Route>
          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<FeedLayout />}>
              <Route path="/feeds" element={<Home />} />
              <Route path="/saved" element={<SavedPosts />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/explore" element={<Explore />} />

            </Route>
          </Route>

          {/* Catch All */}
          <Route path="*" element={<NonExistRoutes />} />
        </Routes>
      </ReactLenis>
    </>
  );
};

export default App;
