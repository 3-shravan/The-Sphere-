import { Loading } from "@/components";
import { useRef } from "react";
import Thoughts from "@/features/posts/post/Thoughts";
import useFeedInfiniteScroll from "./hooks/useFeedInfiniteScroll";
import useFeed from "./hooks/useFeed";
import FeedList from "./components/FeedList";
import FeedDropdown from "./components/FeedDropdown";

const Feed = () => {
  const {
    posts,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    dropdown,
    setDropdown,
  } = useFeed();

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
      <FeedDropdown dropdown={dropdown} setDropdown={setDropdown} />
      <div className="md:hidden mb-4">
        <Thoughts />
      </div>
      {status === "pending" ? (
        <div className=" mt-30">
          <Loading size={6} />
        </div>
      ) : (
        <FeedList posts={posts} isFetchingNextPage={isFetchingNextPage} />
      )}
    </div>
  );
};

export default Feed;
