import { useSmoothScroll } from "@/hooks";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  useSmoothScroll(".create-native-scroll");
  return (
    <div className="flex flex-1 h-full    ">
      <div className="flex flex-col flex-1 items-center gap-10 py-6 pb-20 overflow-y-scroll create-native-scroll  px-5 md:px-8 lg:p-12">
        <div className="max-w-5xl flex gap-3 items-center w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={30}
            height={30}
            alt="add"
          />
          <h2 className=" md:text-2xl md:font-bold md:leading-tight md:tracking-tighter font-bold text-left w-full">
            Create Post
          </h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
