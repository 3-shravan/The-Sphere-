import { LikePost, SavePost, ShowTags, usePostFromCache } from "@/shared";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Comments from "@/features/comments/Comments";

export default function ViewPostInfo({ postId, setShowModal }) {
  const navigate = useNavigate();
  const post = usePostFromCache(postId);
  const handleBackNavigation = () => {
    if (window.history.state && window.history.state.idx > 0) navigate(-1);
    else navigate("/feeds");
  };

  return (
    <div className="w-full md:px-6 md:w-1/2 flex flex-col p-3 md:p-4 border-border ">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post?.author?.profilePicture}
            alt={post?.author?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm">{post?.author?.name}</h2>
            <p className="text-[9px] text-muted-foreground">
              {formatDistanceToNow(new Date(post?.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <button
          onClick={handleBackNavigation}
          className="bg-muted p-2 rounded-full hover:bg-third transition"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      <div className="flex-1 mt-3 space-y-2  overflow-y-auto">
        {post.caption && post.media && (
          <p className="text-sm font-Futura border-b py-2 border-muted">
            {post.caption}
          </p>
        )}
        <ShowTags tags={post.tags} />

        <div className="flex px-2 items-center justify-between gap-4">
          <LikePost postId={post._id} likes={post.likes} />
          <div className="px-2">
            <SavePost postId={post._id} />
            <span
              className="text-xs pl-3 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Share
            </span>
          </div>
        </div>
        <Comments postId={post._id} expanded={true} />
      </div>
    </div>
  );
}
