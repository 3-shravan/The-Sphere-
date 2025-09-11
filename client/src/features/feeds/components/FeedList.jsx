import { Spinner } from "@/components";
import useFeed from "../hooks/useFeed";
import PostCard from "./postcard/PostCard";

const FeedList = () => {
  const { posts, isFetchingNextPage } = useFeed();
  return (
    <div className="flex flex-col gap-3 w-full">
      {posts?.length === 0 || (posts && !posts[0]) ? (
        <span className="text-center text-xs pt-12">No posts</span>
      ) : (
        posts?.map((post) => <PostCard key={post?._id} post={post} />)
      )}
      {isFetchingNextPage && (
        <div className="flex-center mb-6">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default FeedList;
