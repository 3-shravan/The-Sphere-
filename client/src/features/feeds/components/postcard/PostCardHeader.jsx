import { ProfilePicture } from "@/components";
import { multiFormatDateString } from "@/utils";
import { Link } from "react-router-dom";
import PostOptions from "./PostOptions";

const PostCardHeader = ({ post }) => {
  if (!post) return null;
  const { author, createdAt, location } = post;
  return (
    <div className="flex-between mx-auto pl-2">
      <div className="flex items-center gap-3">
        <ProfilePicture
          profilePicture={author?.profilePicture}
          username={author?.name}
        />
        <div className="flex flex-col">
          <Link
            to={`/profile/${author?.name}`}
            className="text-xs md:text-sm font-bold "
          >
            {author?.name}
          </Link>
          <div className="flex gap-2 text-muted-foreground text-[10px] font-medium font-Gilroy ">
            <p>{multiFormatDateString(createdAt)}</p>
            {location && <p>• {location}</p>}
          </div>
        </div>
      </div>

      <PostOptions postId={post._id} />
    </div>
  );
};

export default PostCardHeader;
