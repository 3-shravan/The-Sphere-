import { useEffect } from "react";
import { useSavedPosts, useToggleSavePost } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { setSavedPosts } from "../postSlice";
import { PostGrid } from "@components";
import { H2, showLoading, Container } from "@/components";

const SavedPosts = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSavedPosts();
  const { mutate: toggleSavePost } = useToggleSavePost();

  useEffect(() => {
    dispatch(setSavedPosts(data?.savedPosts));
  }, [data]);
  const { savedPosts } = useSelector((state) => state.posts);
  const saved = (id) => savedPosts.some((post) => id === post._id);

  if (isLoading) return showLoading();

  return (
    <Container>
      <H2 text={"Saved Posts"} />
      <div className="md:mt-7 lg:mt-5">
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
