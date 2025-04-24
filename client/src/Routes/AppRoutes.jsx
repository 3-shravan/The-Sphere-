import { Routes, Route } from "@lib";
import {
  Login,
  Register,
  ForgetPassword,
  ResetPasswordViaEmail,
  ResetPasswordViaPhone,
} from "@features/auth";
import Feed from "@features/feed/Feed";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { NonExistRoutes } from "@components";
import Layout from "@layouts/websitelayout/Layout";

const AppRoutes = () => {
  return (
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
        <Route path="/feeds" element={<Feed />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<NonExistRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
