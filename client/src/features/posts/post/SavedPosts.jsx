import { PostGrid } from "@components";
import { H2, Loading, Container } from "@/components";
import { useSavedPosts, useToggleSavePost } from "@/shared/services";

const SavedPosts = () => {
  const { data, isLoading } = useSavedPosts();
  const savedPosts = data?.savedPosts || [];

  const { mutate: toggleSavePost } = useToggleSavePost();
  const saved = (id) => savedPosts.some((post) => id === post._id);

  if (isLoading) return Loading();
  return (
    <Container>
      <H2 text={"Saved Posts"} />
      <div className="md:mt-7 w-full lg:mt-5">
        <PostGrid
          posts={savedPosts}
          emptyText="No Saved Posts"
          fn={toggleSavePost}
          state={saved}
          toggleSave={true}
        />
      </div>
    </Container>
  );
};

export default SavedPosts;
