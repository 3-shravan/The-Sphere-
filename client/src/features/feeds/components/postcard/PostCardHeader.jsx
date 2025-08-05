import { ProfilePicture } from "@/components";
import { useAuth } from "@/context";
import { multiFormatDateString } from "@/utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import PostOptions from "./PostOptions";
import EditPost from "@/features/posts/post/EditPost";

const PostCardHeader = ({ post, setConfirmDelete }) => {
  if (!post) return null;
  const { currentUserId } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const { author, createdAt, location, thoughts } = post;
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
      {currentUserId === author._id && (
        <PostOptions
          isThoughts={!!thoughts}
          setConfirmDelete={setConfirmDelete}
          setOpen={setEditOpen}
        />
      )}
      {editOpen && <EditPost open={open} setOpen={setEditOpen} post={post} />}
    </div>
  );
};

export default PostCardHeader;
