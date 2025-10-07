import { H2, Loading, Container } from "@/components";
import { PostGrid } from "@/shared";
import { useSavedPosts } from "@/shared/api/useQueries";

const SavedPosts = () => {
  const { data, isLoading } = useSavedPosts();
  const savedPosts = data?.savedPosts || [];

  if (isLoading) return <Loading />;
  return (
    <Container>
      <H2 text={"Saved Posts"} />
      <div className="md:mt-7 w-full lg:mt-5">
        <PostGrid
          posts={savedPosts}
          emptyText="You have'nt saved any post yet🗽"
          showTags={true}
          savePost={true}
        />
      </div>
    </Container>
  );
};

export default SavedPosts;
