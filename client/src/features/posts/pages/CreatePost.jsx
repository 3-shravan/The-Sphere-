import { Container, H2 } from "@/components";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  return (
    <Container>
      <H2 text={"Create Post"} />
      <PostForm action="Create" />
    </Container>
  );
};

export default CreatePost;
