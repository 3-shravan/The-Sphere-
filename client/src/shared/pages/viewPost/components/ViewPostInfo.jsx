import { LikePost, SavePost, ShowTags, usePostFromCache } from "@/shared";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Comments from "@/features/comments/Comments";
import { ProfilePicture, Spinner } from "@/components";
import { Button } from "@/components/ui/button";

export default function ViewPostInfo({ postId, post, setShowModal }) {
  const navigate = useNavigate();
  const handleBackNavigation = () => {
    if (window.history.state && window.history.state.idx > 0) navigate(-1);
    else navigate("/feeds");
  };

  return (
    // overflow-y-auto custom-scrollbar-hide
    <div className="w-full md:px-6 md:w-1/2  flex flex-col p-3 overflow-y-auto custom-scrollbar-hide h-screen md:p-4 border-border ">
      <header className="flex px-1 items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfilePicture
            profilePicture={post?.author?.profilePicture}
            username={post?.author?.name}
            size={"md"}
          />
          <div>
            <h2 className="text-sm">{post?.author?.name}</h2>
            <p className="text-[9px] text-muted-foreground">
              {post?.createdAt && !isNaN(new Date(post.createdAt)) ? (
                formatDistanceToNow(new Date(post?.createdAt), {
                  addSuffix: true,
                })
              ) : (
                <Spinner className="w-3 h-3" />
              )}
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

      <div className="flex-1 mt-4  space-y-2  ">
        {post?.caption && post?.media && (
          <p className="text-sm font-Futura border-b py-2 border-muted">
            {post?.caption}
          </p>
        )}
        <ShowTags tags={post?.tags} />

        <div className="flex px-2 items-center justify-between gap-4">
          <LikePost postId={post?._id} likes={post?.likes} />
          <div>
            <SavePost postId={post?._id} />
            <Button
              variant="outline"
              className="text-xs ml-2 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Share
            </Button>
          </div>
        </div>
        <Comments postId={post?._id} expanded={true} />
      </div>
    </div>
  );
}
