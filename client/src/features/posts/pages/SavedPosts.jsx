import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSavedPosts, useToggleSavePost } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { setSavedPosts } from "../postSlice";
import { useSmoothScroll } from "@/hooks";

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
  useSmoothScroll(".create-native-scroll");

  return (
    <div className="flex flex-1 h-full">
      <div className=" text-foreground create-native-scroll overflow-y-scroll pb-20 flex-1 py-2 px-5 md:px-8 lg:py-6 lg:px-15">
        <h1 className="text-2xl font-Futura font-bold">Saved Posts</h1>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPosts?.length === 0 ? (
            <span>No Saved Posts</span>
          ) : (
            savedPosts?.map((post) => (
              <div
                key={post._id}
                className="relative rounded-3xl overflow-hidden shadow border border-border"
              >
                {/* Image */}
                <div className="relative w-full h-64">
                  <img
                    src={post.media}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />

                  {/* Top-left author info */}
                  <div className="absolute top-3 left-3 backdrop-blur-md bg-white/20 dark:bg-neutral-800/30 text-sm p-1  rounded-full font-medium text-neutral-800 dark:text-neutral-100 shadow-sm">
                    <div className="flex items-center gap-1">
                      <img
                        src={
                          post.author.profilePicture ||
                          "/assets/icons/profile-placeholder.svg"
                        }
                        alt="Author"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-Gilroy font-thin text-xs  pr-2">
                        {post.author.name}
                      </span>
                    </div>
                  </div>

                  {/* Bottom gradient fade overlay with content */}
                  <div className="absolute bottom-0 left-0 w-full px-4 pb-4 pt-16 bg-gradient-to-t from-neutral-900/90 to-transparent text-neutral-900 ">
                    <h2 className="text-xs font-medium font-Poppins text-neutral-200  mb-1">
                      {post.caption}
                    </h2>
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
                    <div className="flex justify-between">
                      <div className="flex items-center font-Gilroy pt-1">
                        <p className="text-xs text-neutral-400 ">
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                        <p className="text-[10px] text-neutral-400 uppercase  ml-1">
                          {post.location && "in "}
                          {post.location}
                        </p>
                      </div>
                      <button
                        className="ml-2 text-xs text-violet-300 hover:text-violet-500"
                        onClick={() => toggleSavePost(post._id)}
                      >
                        {toggleSave(post._id) ? "Unsave" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;
