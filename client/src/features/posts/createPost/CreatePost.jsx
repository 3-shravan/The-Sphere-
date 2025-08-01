import { Container, H2 } from "@/components";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  return (
    <Container>
      <H2 text={"Create Post"} />
     <div className=" md:mt-7 lg:mt-5 w-full">
     <PostForm action="Create" />
     </div>
    </Container>
  );
};

export default CreatePost;
