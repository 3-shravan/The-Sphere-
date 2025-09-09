import { useNavigate, useParams } from "react-router-dom";
import { X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useGetSinglePost } from "../services";
import { LikePost, SavePost, ShowTags } from "..";
import Comments from "@/features/comments/Comments";

const ViewPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data, isLoading, isError } = useGetSinglePost(postId);
  const post = data?.post;
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
        <div className="text-foreground text-xl">Loading...</div>
      </div>
    );
  }
  if (isError || !post) {
    return (
      <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
        <div className="text-foreground text-xl">Post not found</div>
      </div>
    );
  }
  const {
    author,
    media,
    caption,
    thoughts,
    likes = [],
    tags,
    createdAt,
    _id,
  } = post;
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-background rounded-xl border shadow-xl w-full max-w-6xl h-full md:h-[90vh] flex flex-col md:flex-row overflow-hidden">
        {/* Media or Thoughts */}
        <div className="w-full md:w-1/2 bg-neutral-800/10 rounded-lg flex items-center justify-center">
          {media ? (
            <img
              src={media}
              alt="Post"
              className="max-w-full max-h-full object-contain p-4 rounded-lg"
            />
          ) : (
            <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 font-medium  text-sm w-full h-[60vh] md:h-full font-Poppins uppercase text-neutral-600 leading-5 md:leading-8 ">
              {thoughts}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 flex flex-col p-2 md:p-4 border-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={author?.profilePicture}
                alt={author?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h2 className="text-sm">{author?.name}</h2>
                <p className="text-[9px] font-Gilroy text-muted-foreground">
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="bg-muted p-2 cursor-pointer rounded-full hover:bg-third transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 mt-2 md:mt-4 px-2 space-y-2">
            {/* Caption  */}
            {caption && media && (
              <p className="text-sm font-Futura border-b-1 py-2 border-muted">
                {caption}
              </p>
            )}

            <div className="-ml-1">
              <ShowTags tags={tags} />
            </div>
            <div className="flex items-center gap-4">
              <LikePost postId={post._id} likes={likes} />
              <SavePost postId={post._id} />
              <span className="text-xs">Share</span>
            </div>
            <div className="-ml-[9px]">
              <Comments postId={_id} expanded={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewPost;
