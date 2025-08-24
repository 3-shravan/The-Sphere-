import useFeed from "../hooks/useFeed";
import PostCard from "./postcard/PostCard";

const FeedList = () => {
  const { posts, isFetchingNextPage } = useFeed();
  return (
    <div className="flex flex-col gap-3 w-full">
      {posts?.length === 0 ? (
        <span className="text-center text-xs ">No posts</span>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
      {isFetchingNextPage && (
        <div className=" text-center font-Poppins  text-xl mb-6 ">
          Loading...
        </div>
      )}
    </div>
  );
};

export default FeedList;
