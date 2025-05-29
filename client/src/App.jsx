import { Toast } from "@services/Toast";
import { ReactLenis } from "lenis/react";
import { Routes, Route } from "@lib";
import { PublicRoutes, ProtectedRoutes, NonExistRoutes } from "@components";
import { CreatePost, SavedPosts } from "@/features/posts";
import { Profile } from "@features/users";
import { FeedLayout } from "@layouts";
import { HomePage, Sphere, Explore } from "@pages";
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
        <Toast />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Sphere />} />
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
            <Route path="/" element={<FeedLayout />}>
              <Route path="feeds" element={<HomePage />} />
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
