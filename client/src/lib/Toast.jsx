import "@/styles/toast.css";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { useTheme } from "@/context";
import { PiHeartFill } from "react-icons/pi";
import { useEffect, useState } from "react";

export const Toast = () => {
  const { theme } = useTheme();
  const [position, setPosition] = useState("top-center");
  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth > 1000) setPosition("bottom-right");
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);
  return (
    <Toaster
      position={position}
      duration={5000}
      theme={theme === "dark" ? "dark" : "light"}
      className="sonner-container"
    />
  );
};

export const successToast = (message) =>
  toast.success(message, { className: "h-10" });

export const errorToast = (message) => toast.error(message);

export const infoToast = (message) =>
  toast.info(message, { className: "h-10" });

export function Avatar({ src, size = "w-9 h-9" }) {
  return (
    <img
      src={src}
      alt="profile"
      className={`${size} rounded-full object-cover`}
    />
  );
}

export function UserName({ name }) {
  return <span className="font-bold text-foreground/90 text-xs">{name}</span>;
}

export function ActionButton({ to, label = "View" }) {
  if (!to) return null;
  return (
    <Link
      to={to}
      className="text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-wide font-mono uppercase border text-foreground bg-emerald-600 hover:bg-background transition-colors duration-200"
    >
      {label}
    </Link>
  );
}
export function MessageText({ text, heart = false }) {
  return (
    <p className="mt-1 text-xs text-foreground flex items-center gap-1 font-Futura line-clamp-2">
      {text} {heart && <PiHeartFill className="text-third" size={15} />}
    </p>
  );
}
