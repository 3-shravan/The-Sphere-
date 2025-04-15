import { Routes, Route } from "@lib";
import {
  Login,
  Register,
  ForgetPassword,
  ResetPasswordViaEmail,
  ResetPasswordViaPhone,
} from "@features/auth";
import LandingPage from "@features/landing/LandingPage";
import Feed from "@features/feed/Feed";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { NonExistRoutes } from "@components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<NonExistRoutes />} />

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

      <Route element={<ProtectedRoutes />}>
        <Route path="/feeds" element={<Feed />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
