import React from "react";
import { cn } from "@utils";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  outline: "border border-white/20 text-white hover:bg-white/10",
  ghost: "text-white hover:bg-white/10",
};

const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-6 py-3",
};

const Button = ({
  children,
  variant = "Primary",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        "rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
