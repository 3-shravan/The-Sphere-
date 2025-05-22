import { useDispatch, useSelector } from "react-redux";
import { usePosts, useSavedPosts } from "../services";
import Card from "./Card";
import Loader from "./Loader";
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
  useSmoothScroll(".home-native-scroll");
  return (
    <div
      className="js-native-scroll home-native-scroll
     h-[90vh] pb-4 max-w-screen-sm flex flex-col items-center rounded-xl gap-6 md:gap-5 md:min-w-[50vw]  md:px-4   "
    >
      <div className="flex  gap-10 items-end  justify-start w-full">
        <h2 className=" text-2xl px-2 font-extralight font-Futura leading-tight tracking-tighter md:text-xl md:font-light md:leading-tight md:tracking-tighter md:w-auto w-full  ">
          your feed
        </h2>
      </div>
      {isLoading && !posts ? (
        <Loader />
      ) : (
        <div className="flex flex-col flex-1 rounded-4xl pt-2 pb-1 gap-4 w-full">
          {posts.map((post) => (
            <Card key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
