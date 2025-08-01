export const RegisterInitialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  verificationMethod: "email",
};

export const LoginInitialFormData = {
  email: "",
  phone: "",
  password: "",
};

export const ForgetPasswordFormData = {
  email: "",
  phone: "",
};

export const ResetPasswordFormData = {
  newPassword: "",
  confirmPassword: "",
};

export const MarqueeItems = [
  "👥 Connect with Like-Minded People!",
  "🔥 Trending Now: #SocialBuzz",
  "📸 Share Your Moments Instantly!",
  "📢 Join the Conversation!",
  "🎉 New Features Released!",
  "💬 Chat in Real-Time!",
  "📍 Discover New People Nearby!",
  "🚀 Boost Your Posts Today!",
  "🎶 Explore Viral Content!",
  "💡 Get Inspired Every Day!",
];

export const tabs = [
  {
    route: "/feeds",
    label: "Home",
  },
  {
    route: "/explore",
    label: "Explore",
  },
  {
    route: "/saved",
    label: "Saved",
  },
  {
    route: "/create-post",
    label: "New Post",
  },
  // {
  //   route: "/profile",
  //   label: "Profile",
  // },
];
