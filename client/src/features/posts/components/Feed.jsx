import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { usePosts, useSavedPosts } from "../services";
import { Loader } from "@components";
import { setPosts, setSavedPosts } from "../postSlice";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks";

const Feed = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = usePosts();
  const { data: savedPosts } = useSavedPosts();
  useEffect(() => {
    if (data?.posts) dispatch(setPosts(data.posts));
    if (savedPosts?.savedPosts) dispatch(setSavedPosts(savedPosts.savedPosts));
  }, [data, savedPosts, dispatch]);

  const { posts } = useSelector((state) => state.posts || []);
  useSmoothScroll(".smooth-scroll");
  return (
    <div className="overflow-y-scroll smooth-scroll flex flex-col rounded-lg feed ">
      <WhatsOnYourMind />
      <h2 className="your-feed">your feed</h2>
      {isLoading && !posts ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {posts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;

const WhatsOnYourMind = () => (
  <div className="w-full mt-4  bg-card p-4 lg:w-[42vw] font-Futura rounded-2xl md:rounded-lg   border md:border-2 border-border ">
    <input
      type="text"
      className=" w-full rounded-full p-3 text-xs border border-border"
      placeholder="have any thoughts ?"
    />
    <button className="w-full rounded-lg mt-2 p-1 text-rose-400 bg-muted">
      {" "}
      Post{" "}
    </button>
  </div>
);
