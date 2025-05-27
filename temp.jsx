
const temp = () => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-3 mt-3">
          <div>
            <button
              onClick={() => toggleLike(post._id)}
              className="text-sm font-semibold text-light-1"
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
            <span className="text-xs font-semibold ">
              {updatedPost?.likes.length || 0}{" "}
              {updatedPost?.likes.length === 1 ? "Like" : "Likes"}
            </span>
          </div>

          <button
            className="text-sm px-3 py-2"
            onClick={() => toggleSave(post._id)}
          >
            {isSaved ? "Unsave" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default temp;
