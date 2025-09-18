import { formatDistanceToNow } from "date-fns";
import { LikePost, PostOptions, SavePost, ShowTags } from "@/shared";
import { H2, Backdrop } from "@/components";
import { useNavigate } from "react-router-dom";
import ThoughtsCard from "./ui/ThoughtsCard";

const WORDS = 70;

const PostGrid = ({
  posts = [],
  emptyText = "No Posts",
  showAuthor = true,
  showCaption = true,
  showTags = false,
  savePost = false,
  likePost = false,
}) => {
  if (!posts) return null;

  const navigate = useNavigate();

  const isExpanded = (caption, WORDS) => caption.length > WORDS;
  const toViewPost = (postId) => navigate(`/post/${postId}`);
  const toProfile = (username) => navigate(`/profile/${username}`);

  return (
    <div className="grid md:grid-cols-2 w-full lg:grid-cols-3 gap-4 lg:gap-6">
      {posts.length === 0 ? (
        <H2>{emptyText}</H2>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="relative rounded-4xl overflow-hidden shadow border cursor-pointer"
          >
            <div className="relative w-full h-64">
              {post?.media && (
                <img
                  onClick={() => toViewPost(post._id)}
                  src={post.media}
                  alt="post"
                  className="w-full absolute  h-full object-cover"
                />
              )}
              <div className="absolute top-3 right-1 ">
                <PostOptions
                  postId={post._id}
                  author={post.author}
                  thoughts={post.thoughts}
                />
              </div>
              <div
                className="absolute -z-10 h-full w-full"
                onClick={() => toViewPost(post._id)}
              >
                <ThoughtsCard thought={post?.thoughts} postId={post._id} />
              </div>

              {showAuthor && (
                <Backdrop
                  fn={() => toProfile(post?.author?.name)}
                  image={post?.author?.profilePicture}
                  position="top-left"
                >
                  {post?.author?.name}
                </Backdrop>
              )}

              {/* Gradient Overlay Content */}
              <div
                className={`absolute bottom-0 left-0 w-full px-4  pb-4 text-neutral-900
                  ${
                    post.media &&
                    "bg-gradient-to-t from-neutral-900/95 to-transparent"
                  }`}
              >
                {showCaption && (
                  <h2 className="text-xs font-medium font-Poppins text-neutral-300 mb-1">
                    {isExpanded(post.caption, WORDS) ? (
                      <>
                        {post?.caption.slice(0, WORDS)}
                        <span className="text-second text-xs font-semibold font-Poppins">
                          ...more
                        </span>
                      </>
                    ) : (
                      post?.caption
                    )}
                  </h2>
                )}

                {showTags && <ShowTags tags={post.tags} count={2} />}
                <Footer
                  createdAt={post.createdAt}
                  location={post.location}
                  id={post._id}
                  savePost={savePost}
                  likePost={likePost}
                  likes={post.likes}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostGrid;

const Footer = ({ createdAt, location, savePost, likePost, id, likes }) => (
  <div className="flex justify-between">
    <div className="flex items-center font-Gilroy pt-1">
      <p className="text-[10px] text-neutral-400">
        {formatDistanceToNow(new Date(createdAt), {
          addSuffix: true,
        })}
      </p>
      {location && (
        <p className="text-[10px] text-neutral-400 uppercase ml-1">
          in {location}
        </p>
      )}
    </div>
    <div className="flex gap-2">
      {savePost && <SavePost postId={id} />}
      {likePost && <LikePost postId={id} likes={likes} likedBy={false} />}
    </div>
  </div>
);
