import ToastConfig from "@services/ToastConfig";
import { ReactLenis } from "lenis/react";
import { PublicRoutes, ProtectedRoutes, NonExistRoutes } from "@components";
import { CreatePost, Home, SavedPosts, Explore } from "@/features/posts";
import { Routes, Route } from "@lib";
import { Layout, LandingPage } from "@layouts";
import {
  Login,
  Register,
  ForgetPassword,
  ResetPasswordViaEmail,
  ResetPasswordViaPhone,
} from "@features/auth";
import { Profile } from "@features/users";

const App = () => {
  return (
    <>
      <ReactLenis root>
        <ToastConfig />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<LandingPage />} />
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
            <Route path="/" element={<Layout />}>
              <Route path="feeds" element={<Home />} />
              <Route path="saved" element={<SavedPosts />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="explore" element={<Explore />} />
              <Route path="profile" element={<Profile />} />
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
