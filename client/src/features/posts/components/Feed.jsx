import { useDispatch, useSelector } from "react-redux";
import { usePosts, useSavedPosts } from "../services";
import Card from "./Card";
import Loader from "./Loader";
import { setPosts, setSavedPosts } from "../postSlice";
import { useEffect } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = usePosts();
  const { data: savedPosts } = useSavedPosts();
  useEffect(() => {
    if (data?.posts) dispatch(setPosts(data.posts));
    if (savedPosts?.savedPosts) dispatch(setSavedPosts(savedPosts.savedPosts));
  }, [data, savedPosts, dispatch]);

  const { posts } = useSelector((state) => state.posts || []);
  
  return (
    <div className="max-w-screen-sm flex flex-col items-center rounded-xl gap-6 md:gap-5">
      <div className="flex gap-10 items-end  justify-start w-full">
        <h2 className=" text-2xl px-2 font-bold leading-tight tracking-tighter md:text-2xl md:font-bold md:leading-tight md:tracking-tighter md:w-auto w-full  ">
          Feeds
        </h2>
        <div className="flex gap-5 px-5 py-1  ">
          <h4 className="text-xs cursor-pointer text-neutral-300 leading-tight tracking-tighter md:text-xs md:font-bold md:leading-tight md:tracking-tighter text-center w-full">
            Friends
          </h4>
          <h4 className="text-xs cursor-pointer  text-neutral-700 leading-tight tracking-tighter md:text-xs md:font-bold md:leading-tight md:tracking-tighter text-center w-full">
            Recents
          </h4>
        </div>
      </div>
      {isLoading && !posts ? (
        <Loader />
      ) : (
        <ul className="flex flex-col flex-1 gap-9 w-full">
          {posts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feed;
