import PostForm from "../components/PostForm";
import Container from "../components/ui/Container";

const CreatePost = () => {
  return (
    <Container>
      <div className="max-w-5xl flex gap-3 items-center w-full">
        <h2 className=" text-2xl md:font-bold md:leading-tight md:tracking-tighter font-Futura font-bold text-left w-full">
          Create Post
        </h2>
      </div>

      <PostForm action="Create" />
    </Container>
  );
};

export default CreatePost;
