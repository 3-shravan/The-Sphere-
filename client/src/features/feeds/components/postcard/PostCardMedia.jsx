import { ThoughtsCard } from "@/components";
const PostCardMedia = ({ media, thoughts }) => {
  if (media) {
    return (
      <div className="w-full flex md:max-w-[55vw] lg:w-[45vw] justify-center p-2 rounded-xl">
        <img
          src={media}
          alt="post"
          className="w-full max-h-[60vh] md:max-h-[85vh] object-cover rounded-xl cursor-pointer"
        />
      </div>
    );
  } else {
    return <ThoughtsCard thought={thoughts} className="pt-0" />;
  }
};

export default PostCardMedia;
