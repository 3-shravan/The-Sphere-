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

export const ResetPassowrdViaEmail = {
  newPassword: "",
  confirmPassword: "",
  phone: "",
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
    img: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    img: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    img: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    img: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "New Post",
  },
];

