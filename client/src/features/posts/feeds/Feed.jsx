import { Loading } from "@/components";
import Thoughts from "@/pages/homePage/components/Thoughts";
import useFeed from "./useFeed";
import FeedList from "./FeedList";
import useFeedInfiniteScroll from "./useFeedInfiniteScroll";
import { useRef } from "react";

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
      <div className=" md:hidden mb-4">
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
