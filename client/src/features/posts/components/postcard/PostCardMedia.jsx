import { SetImageRatio, ThoughtsCard } from "@/components";

const PostCardMedia = ({ media, thoughts }) => {
  if (media) {
    return (
      <div className="w-full flex justify-center">
        <div className="flex w-full px-2 py-2 rounded-xl">
          <SetImageRatio src={media} />
        </div>
      </div>
    );
  } else {
    return <ThoughtsCard thought={thoughts} className="pt-0" />;
  }
};

export default PostCardMedia;
