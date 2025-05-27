import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
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
  useSmoothScroll(".create-native-scroll");
  return (
    <div className=" overflow-y-scroll rounded create-native-scroll h-[90vh] flex flex-col feed-resize">
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
