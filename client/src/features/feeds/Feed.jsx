import { Loading } from "@/components";
import { useRef } from "react";
import Thoughts from "@/features/posts/post/Thoughts";
import useFeedInfiniteScroll from "./hooks/useFeedInfiniteScroll";
import useFeed from "./hooks/useFeed";
import FeedList from "./components/FeedList";

const Feed = () => {
  const { posts, status, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFeed();

  const scrollRef = useRef(null);

  useFeedInfiniteScroll({
    scrollRef,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  return (
    <div
      ref={scrollRef}
      className="overflow-y-scroll flex flex-col rounded-lg feed "
    >
      <h2 className="your-feed">your feed</h2>
      <div className="md:hidden mb-4">
        <Thoughts />
      </div>
      {status === "pending" ? (
        <Loading />
      ) : (
        <FeedList posts={posts} isFetchingNextPage={isFetchingNextPage} />
      )}
    </div>
  );
};

export default Feed;
