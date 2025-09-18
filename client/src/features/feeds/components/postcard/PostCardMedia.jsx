import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import ThoughtsCard from "@/shared/components/ui/ThoughtsCard";

const PostCardMedia = ({ media, thoughts, likePostRef }) => {
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleClick = () => {
    likePostRef?.current?.triggerLike();
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000); // longer to show full animation
  };

  if (media) {
    return (
      <div className="relative w-full flex justify-center p-2">
        <div className="overflow-hidden rounded-2xl max-w-[90vw] md:max-w-[55vw] lg:max-w-[45vw]">
          <img
            src={media}
            alt="post"
            onDoubleClick={handleDoubleClick}
            className="w-full max-h-[85vh] object-cover cursor-pointer"
          />
        </div>

        {showHeart && (
          <FaHeart className="absolute inset-0 m-auto text-rose-600 text-8xl opacity-50 animate-[popBounce_1s_ease-out]" />
        )}
      </div>
    );
  } else {
    return <ThoughtsCard thought={thoughts} className="pt-0 px-2.5" />;
  }
};

export default PostCardMedia;
