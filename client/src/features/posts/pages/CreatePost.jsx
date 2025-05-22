import { useSmoothScroll } from "@/hooks";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  useSmoothScroll(".create-native-scroll");
  return (
    <div className="flex flex-1 h-full">
      <div className="flex flex-col items-center gap-6 md:gap-10  overflow-y-scroll create-native-scroll  flex-1 py-2 pb-20 px-5 md:px-8 lg:py-6 lg:px-15">
        <div className="max-w-5xl flex gap-3 items-center w-full">
          {/* <img
            src="/assets/icons/add-post.svg"
            width={30}
            height={25}
            alt="add"
            className="bg-indigo-600  rounded-full p-1 "
          /> */}
          <h2 className=" text-2xl md:font-bold md:leading-tight md:tracking-tighter font-Futura font-bold text-left w-full">
            Create Post
          </h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
