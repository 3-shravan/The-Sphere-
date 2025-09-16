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
      <div className="relative w-full flex md:max-w-[55vw] lg:w-[45vw] justify-center p-2 rounded-xl">
        <img
          src={media}
          alt="post"
          className="w-full max-h-[60vh] md:max-h-[85vh] object-cover rounded-xl cursor-pointer"
          onDoubleClick={handleDoubleClick}
        />
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
