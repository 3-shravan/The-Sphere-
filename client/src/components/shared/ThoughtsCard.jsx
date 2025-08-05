import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const ThoughtsCard = ({ thought, redirect = false, className = "" }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = thought.trim().length > 300;

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div
      className={twMerge(
        "px-4 pt-14 pb-4 text-xs font-Poppins text-foreground",
        className
      )}
    >
      {isLong ? (
        <>
          {expanded ? thought : `${thought.slice(0, 300)} `}
          <button
            onClick={
              redirect ? () => (window.location.href = "feeds") : toggleExpanded
            }
            className="text-rose-400 font-Poppins hover:underline hover:text-muted-foreground/40 cursor-pointer"
          >
            {expanded ? (
              <span>
                {" "}
                <ChevronUp className="inline w-3" />
                show less
              </span>
            ) : (
              <span>
                {" "}
                ..show more
                <ChevronDown className="inline w-3 " />
              </span>
            )}
          </button>
        </>
      ) : (
        thought
      )}
    </div>
  );
};

export default ThoughtsCard;
