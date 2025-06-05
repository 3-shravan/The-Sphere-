import { useDispatch, useSelector } from "react-redux";
import { usePosts, useSavedPosts } from "../services";
import { setPosts, setSavedPosts } from "../postSlice";
import { useEffect } from "react";
import { useSmoothScroll } from "@/hooks";
import Thoughts from "@/pages/homePage/components/Thoughts";
import PostCard from "./PostCard";
import { Loading } from "@/components";

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
      <h2 className="your-feed">your feed</h2>
      <div className=" md:hidden mb-4">
        <Thoughts />
      </div>
      {isLoading && <Loading />}

      <div className="flex flex-col gap-4 w-full">
        {posts.length === 0 ? (
          <span>No posts available</span>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
