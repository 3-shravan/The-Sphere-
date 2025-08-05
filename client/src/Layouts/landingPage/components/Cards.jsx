import { clsx } from "clsx";
import { Heart, MessageSquare, Send } from "lucide-react";

export const Notificaton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center md:absolute md:top-30 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 gap-2 z-10 ">
      <div
        className="flex items-center gap-2  backdrop-blur-lg border border-border  py-1.5 px-2"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&cs=tinysrgb&w=600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-8 h-8 rounded-full  overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542458579-bc6f69b5ce6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D"
            alt="Profile"
            className="w-full h-full border border-blue-100 rounded-full object-cover"
          />
        </div>
        <p className="text-white uppercase text-xs">
          Damon you a got new message.
        </p>
      </div>
    </div>
  );
};

export const Connect = () => {
  return (
    <GlassCard className="md:absolute md:left-25 md:bottom-60.5  rounded-4xl px-5 py-3">
      <h2 className="text-white text-sm uppercase font-bold ">Connect</h2>
      <div className="flex justify-center gap-4 py-4">
        <div className=" w-40 h-40 md:w-30 md:h-12 rounded-4xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/4310726/pexels-photo-4310726.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Profile"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <ProfileImg
          src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
          className=" w-40 h-40 md:w-12 md:h-12"
        />
      </div>
      <button className="w-full py-2 bg-emerald-200 border border-border rounded-full font-bold text-emerald-700 text-xs flex  items-center justify-center gap-1">
        Send message <Send className="w-3 h-3" />
      </button>
    </GlassCard>
  );
};

export const Post = () => {
  return (
    <GlassCard className="md:absolute md:left-26 md:min-w-64 md:bottom-0 ">
      <div className="w-full md:h-45 rounded-2xl overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1572878/pexels-photo-1572878.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Profile"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="flex justify-between items-center px-2 py-2">
        <p className="text-white text-xs font-[Gilroy] text-end">ALICE</p>
        <Stats icon={MessageSquare} count="1.2k" iconColor="text-blue-700" />
        <Stats icon={Heart} count="2 MILLION" iconColor="text-red-500" />
      </div>
    </GlassCard>
  );
};

export const Nearby = () => {
  const images = [
    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/157661/young-woman-shooting-model-157661.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/906052/pexels-photo-906052.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];
  return (
    <GlassCard className=" mt-3 p-3 md:absolute text-xs md:text-sm md:right-20 md:top-25  md:w-64 z-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-bold uppercase">Near you</h2>
        <button className="text-white">&gt;</button>
      </div>
      <p className="text-neutral-400 text-xs mb-4 font-[Poppins]">
        Find a match in the neighborhood
      </p>
      <div className="relative  flex items-center p-2 bg-red-300  border border-border rounded-full justify-center">
        {images.map((src, index) => (
          <ProfileImg
            key={index}
            src={src}
            className="w-12 h-12 border-2 border-white"
          />
        ))}
      </div>
    </GlassCard>
  );
};

export const UnreadMessage = () => {
  return (
    <GlassCard className=" p-4 md:absolute md:top-12 md:left-50 md:p-3  md:block">
      <h2 className="text-white text-sm font-bold uppercase mb-3">Unread</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <ProfileImg
            src="https://images.pexels.com/photos/6507483/pexels-photo-6507483.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-10 h-10"
          />
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Davis Dean</p>
            <p className="text-neutral-400 w-35 text-[10px]  truncate">
              Has anyone seen my cat?
            </p>
          </div>
          <span className="text-neutral-400 text-[10px] ">11:11</span>
        </div>
      </div>
    </GlassCard>
  );
};

export const Chats = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <GlassCard className=" hidden md:block md:absolute md:bottom-25 md:right-30 md:w-80 px-3 py-2 pb-3">
      <div className="flex items-center gap-2 pb-2">
        <ProfileImg
          src="https://images.pexels.com/photos/157661/young-woman-shooting-model-157661.jpeg?auto=compress&cs=tinysrgb&w=600"
          className="w-10 h-10"
        />
        <p className="text-white font-medium">Violet Baker</p>
      </div>
      <div className="space-y-2">
        <MessageBubble>
          <p className="text-neutral-400 font-semibold text-xs">
            Hi! What's plan for today?
          </p>
          <p className="text-[10px] text-right">11:11</p>
        </MessageBubble>
        <div className="flex justify-end ">
          <MessageBubble isOwn={true} className="flex items-end  gap-1">
            <p className="text-rose-700 p-1 font-semibold text-xs">
              its {daysOfWeek[new Date().getDay()]}..lets
            </p>
            <Send className="w-6 h-5 p-1 bg-neutral-800 my-1 rounded-full  text-rose-800 " />
          </MessageBubble>
        </div>
      </div>
    </GlassCard>
  );
};

/**
 * @Helper_Functions
 * GlassCard - Main container component
 * Profile Image component
 * Notification Badge component
 * Icon Button component
 * Message Bubble component
 * Stats component
 */

// Glass Card - Main container component
const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={clsx(
        "bg-black/40 backdrop-blur-md w-full md:w-auto my-10 font-Poppins border-2 border-border rounded-3xl",
        className
      )}
    >
      {children}
    </div>
  );
};

// Profile Image component
const ProfileImg = ({ src, alt = "Profile", className = "" }) => {
  return (
    <div className={clsx("rounded-full overflow-hidden", className)}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

// Notification Badge component
const NotificationBadge = ({ children, className = "" }) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 border border-violet-200 backdrop-blur-lg rounded-full py-2 px-2.5",
        className
      )}
    >
      {children}
    </div>
  );
};

// Icon Button component
const IconBtn = ({
  icon: Icon,
  className = "",
  iconClassName = "",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-green-200",
        className
      )}
      {...props}
    >
      <Icon className={clsx("w-5 h-5 text-white", iconClassName)} />
    </button>
  );
};

// Message Bubble component
const MessageBubble = ({ children, isOwn = false, className = "" }) => {
  return (
    <div
      className={clsx(
        "rounded-2xl p-1.5 max-w-[70%]",
        isOwn
          ? "bg-rose-200 border-1 border-border backdrop-blur-md p-2 "
          : " border border-border backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
};

// Stats component
const Stats = ({
  icon: Icon,
  count,
  iconColor = "text-white",
  className = "",
  iconClassName = "",
  countClassName = "",
}) => {
  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <div className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center">
        <Icon className={clsx("w-4 h-4", iconColor, iconClassName)} />
      </div>
      <p className={clsx("text-white text-xs", countClassName)}>{count}</p>
    </div>
  );
};
