import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSavedPosts, useToggleSavePost } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { setSavedPosts } from "../postSlice";

const SavedPosts = () => {
  const { data, isLoading, isError } = useSavedPosts();
  const { mutate: toggleSavePost } = useToggleSavePost();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSavedPosts(data?.savedPosts));
  });
  const { savedPosts } = useSelector((state) => state.posts);
  const toggleSave = (id) => savedPosts.some((post) => id === post._id);

  if (isLoading)
    return (
      <div className="text-center py-10 text-lg">Loading saved posts...</div>
    );
  if (isError || !data?.success)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load saved posts.
      </div>
    );

  return (
    <div className=" w-full px-10 py-8">
      <h1 className="text-3xl font-bold  mb-8 text-neutral-900 dark:text-neutral-100">
        Saved Posts
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedPosts?.length === 0 ? (
          <span>No Saved Posts</span>
        ) : (
          savedPosts?.map((post) => (
            <div
              key={post._id}
              className="relative rounded-2xl overflow-hidden shadow border border-neutral-200 dark:border-neutral-800"
            >
              {/* Image */}
              <div className="relative w-full h-64">
                <img
                  src={post.media}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />

                {/* Top-left author info */}
                <div className="absolute top-3 left-3 backdrop-blur-md bg-white/30 dark:bg-neutral-800/30 text-sm px-3 py-1 rounded-full font-medium text-neutral-800 dark:text-neutral-100 shadow-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        post.author.profilePicture ||
                        "/assets/icons/profile-placeholder.svg"
                      }
                      alt="Author"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="font-Gilroy font-thin text-sm">
                      {post.author.name}
                    </span>
                  </div>
                </div>

                {/* Bottom gradient fade overlay with content */}
                <div className="absolute bottom-0 left-0 w-full px-4 pb-4 pt-16 bg-gradient-to-t from-neutral-50/90 dark:from-neutral-900/90 to-transparent text-neutral-900 dark:text-neutral-100">
                  <h2 className="text-sm font-semibold mb-1">{post.caption}</h2>
                  {/* Tags */}
                  {/* <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-violet-100 text-violet-400 font-semibold text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div> */}

                  {/* Time */}
                  <div className="flex justify-between ">
                    <div className="flex items-center font-Gilroy pt-1">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                      <p className="text-[10px] text-neutral-600 uppercase dark:text-neutral-400 ">
                        {" "}
                        <span>-</span> {post.location}
                      </p>
                    </div>
                    <button onClick={() => toggleSavePost(post._id)}>
                      {toggleSave(post._id) ? "unsave" : "save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
