import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const ThoughtsCard = ({
  thought,
  postId,
  redirect = false,
  className = "",
}) => {
  const navigate = useNavigate();
  const isLong = thought?.trim().length > 300;
  const [expanded, setExpanded] = useState(false);
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
              redirect ? () => navigate(`/post/${postId}`) : toggleExpanded
            }
            className="text-second font-Poppins hover:underline hover:text-muted-foreground/40 cursor-pointer"
          >
            {expanded ? (
              <span>
                {" "}
                <ChevronUp className="inline w-3" />
                show less
              </span>
            ) : (
              <span>
                show more
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
