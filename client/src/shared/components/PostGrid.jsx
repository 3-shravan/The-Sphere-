import { formatDistanceToNow } from "date-fns";
import { SavePost, ShowTags } from "@/shared";
import { H2, Backdrop, ThoughtsCard } from "@/components";
import { useNavigate } from "react-router-dom";

const WORDS = 70;

const PostGrid = ({
  posts = [],
  emptyText = "No Posts",
  showAuthor = true,
  showCaption = true,
  showTags = false,
  toggleSave = false,
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
                  className="w-full absolute z-0 h-full object-cover"
                />
              )}

              <div
                className="absolute h-full w-full"
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
                  toggleSave={toggleSave}
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

const Footer = ({ createdAt, location, toggleSave, id }) => (
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
    {toggleSave && <SavePost postId={id} force={true} />}
  </div>
);
