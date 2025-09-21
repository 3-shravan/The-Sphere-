import { Spinner } from "@/components";
import { usePost } from "@/context";
import PostCard from "./postcard/PostCard";

export default function FeedList({
  isFetchingNextPage,
  dropdown,
  setDropdown,
}) {
  const { posts } = usePost();
  if (!posts) return null;
  return (
    <div className="flex flex-col gap-3 w-full">
      {posts.length === 0 || !posts[0] ? (
        <PostsEmpty dropdown={dropdown} setDropdown={setDropdown} />
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
      {/* loading spinner for fetching more posts */}
      {isFetchingNextPage && (
        <div className="flex-center mb-6">
          <Spinner />
        </div>
      )}
    </div>
  );
}

const PostsEmpty = ({ dropdown, setDropdown }) => (
  <div className="flex-center mt-20 flex-col gap-2">
    <span className=" text-sm uppercase">No posts 🗽</span>
    {dropdown === "following" && (
      <>
        <span className="text-center text-[10px] uppercase">
          Follow some people to see their posts
        </span>
        <span
          className="text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-wide font-mono uppercase border text-foreground bg-emerald-600 hover:bg-background cursor-pointer transition-colors duration-200"
          onClick={() => setDropdown("all")}
        >
          show post from everywehere
        </span>
      </>
    )}
  </div>
);
