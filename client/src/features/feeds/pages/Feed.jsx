import { Loading } from "@/components";
import { useRef } from "react";
import { usePost } from "@/context";
import Thoughts from "@/features/posts/components/Thoughts";
import useFeedInfiniteScroll from "../hooks/useFeedInfiniteScroll";
import FeedList from "../components/FeedList";
import FeedDropdown from "../components/FeedDropdown";

export default function Feed() {
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
          dropdown={dropdown}
          setDropdown={setDropdown}
          isFetchingNextPage={fetchInfinite?.isFetchingNextPage}
        />
      )}
    </div>
  );
}
