import { usePosts } from "../hooks/usePosts";

export const PostList = () => {
  const { data, isLoading, error } = usePosts();

  if (isLoading) {
    return <div className="text-center text-lg py-10">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg py-10">
        Error loading posts.
      </div>
    );
  }

  if (!data || !data.posts || data.posts.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg py-10">
        No posts available.
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.posts.map((post) => (
          <div
            key={post._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.media && (
              <img
                src={post.media}
                alt={post.caption || "Post media"}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-4">
              <p className="text-gray-800 dark:text-gray-100 font-semibold">
                {post.caption || "No caption provided."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
