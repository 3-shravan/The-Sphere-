import { Loading } from "@/components";
import { useRef } from "react";
import Thoughts from "@/features/posts/post/Thoughts";
import useFeedInfiniteScroll from "./hooks/useFeedInfiniteScroll";
import FeedList from "./components/FeedList";
import FeedDropdown from "./components/FeedDropdown";
import { usePost } from "@/context";

const Feed = () => {
  const { posts, status, fetchInfinite, dropdown, setDropdown } = usePost();
  const scrollRef = useRef(null);

  useFeedInfiniteScroll({ ...fetchInfinite, scrollRef });

  return (
    <div
      ref={scrollRef}
      className="overflow-y-scroll flex flex-col rounded-lg feed"
    >
      <FeedDropdown dropdown={dropdown} setDropdown={setDropdown} />
      <div className="md:hidden mb-4">
        <Thoughts />
      </div>

      {status === "pending" ? (
        <div className="mt-30">
          <Loading size={6} />
        </div>
      ) : (
        <FeedList
          posts={posts}
          isFetchingNextPage={fetchInfinite?.isFetchingNextPage}
        />
      )}
    </div>
  );
};

export default Feed;
