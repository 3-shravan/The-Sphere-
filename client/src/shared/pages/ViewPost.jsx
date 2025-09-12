import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShareModal } from "..";
import { useGetSinglePost } from "../services";
import { Error, Loading, Modal } from "@/components";
import ViewPostMedia from "./viewPost/components/ViewPostMedia";
import ViewPostInfo from "./viewPost/components/ViewPostInfo";

const ViewPost = () => {
  const { postId } = useParams();
  const { data, isLoading, isError } = useGetSinglePost(postId);
  const [showModal, setShowModal] = useState(false);

  const post = data?.post;

  if (isLoading) return <Loading />;
  if (isError || !post) return <Error />;
  const { media, thoughts, _id } = post;

  return (
    <div className=" inset-0 bg-background flex items-center h-screen justify-center z-50 p-2 md:p-4">
      <main className="bg-background rounded-xl border  shadow-xl w-full max-w-6xl h-full md:h-[95vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
        <ViewPostMedia media={media} thoughts={thoughts} />
        <ViewPostInfo postId={_id} post={post} setShowModal={setShowModal} />

        {showModal && (
          <Modal onCancel={() => setShowModal(false)} title="Share Post">
            <ShareModal postId={postId} />
          </Modal>
        )}
      </main>
    </div>
  );
};
export default ViewPost;
