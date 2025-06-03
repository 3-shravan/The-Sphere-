import { formatDistanceToNow } from "date-fns";
import Backdrop from "./ui/Backdrop";

const PostGrid = ({
  posts = [],
  emptyText = "No Posts",
  showAuthor = true,
  showCaption = true,
  showTags = false,
  fn,
  state,
  toggleSave = false,
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.length === 0 ? (
        <span className="font-semibold font-Poppins">{emptyText}</span>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="relative rounded-3xl overflow-hidden shadow border border-border"
          >
            {/* Image */}
            <div className="relative w-full h-64">
              <img
                src={post.media}
                alt="post"
                className="w-full h-full object-cover"
              />

              {/* Author */}
              {showAuthor && (
                <Backdrop
                  image={post?.author?.profilePicture}
                  position="top-left"
                >
                  {post?.author?.name}
                </Backdrop>
              )}

              {/* Gradient Overlay Content */}
              <div className="absolute bottom-0 left-0 w-full px-4 pb-4 pt-16 bg-gradient-to-t from-neutral-900/90 to-transparent text-neutral-900">
                {showCaption && (
                  <h2 className="text-xs font-medium font-Poppins text-neutral-300 mb-1">
                    {post.caption}
                  </h2>
                )}

                {showTags && <Tags tags={post.tags} />}

                {/* Footer */}
                <Footer
                  createdAt={post.createdAt}
                  location={post.location}
                  id={post._id}
                  toggleSave={toggleSave}
                  fn={fn}
                  state={state}
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

const SavePost = ({ id, fn, saved }) => (
  <button
    onClick={() => fn(id)}
    className="text-xs text-rose-300 hover:text-rose-500"
  >
    {saved ? "Unsave" : "Save"}
  </button>
);
const Tags = ({ tags }) =>
  tags?.length > 0 ? (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-violet-100 text-rose-400 font-semibold text-xs px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  ) : null;
const Footer = ({ createdAt, location, toggleSave, fn, id, state }) => (
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
    {toggleSave && <SavePost id={id} fn={fn} saved={state(id)} />}
  </div>
);
