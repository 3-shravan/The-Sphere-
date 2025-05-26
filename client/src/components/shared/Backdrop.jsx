import React from "react";
import clsx from "clsx";

const positionClasses = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-center": "top-3 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-3 left-1/2 -translate-x-1/2",
};

const Backdrop = ({
  children,
  image = null,
  position = "top-left",
  alt = "Image",
}) => {
  return (
    <div
      className={clsx(
        "absolute z-50 backdrop-blur-md bg-white/20 dark:bg-neutral-800/30 text-sm p-1 rounded-full font-medium text-neutral-800 dark:text-neutral-100 shadow-sm",
        positionClasses[position]
      )}
    >
      <div className="flex items-center gap-1 px-0.5">
        {image && (
          <img
            src={image}
            alt={alt}
            className="w-6 h-6 rounded-full object-cover"
          />
        )}
        <span className="font-Gilroy font-thin text-xs">{children}</span>
      </div>
    </div>
  );
};

export default Backdrop;
