import { useState } from "react";
import { useParams } from "react-router-dom";
import { Error, Loading, Modal } from "@/components";
import { useGetSinglePost } from "@/shared/services";
import { ShareModal } from "@/shared";
import ViewPostMedia from "../components/view-post/ViewPostMedia";
import ViewPostInfo from "../components/view-post/ViewPostInfo";

export default function ViewPost() {
  const { postId } = useParams();
  const { data, isLoading, isError } = useGetSinglePost(postId);
  const post = data?.post;

  const [showModal, setShowModal] = useState(false);

  if (isLoading)
    return (
      <div className="mt-8">
        <Loading />
      </div>
    );
  if (isError || !post) return <Error />;

  const { media, thoughts, _id } = post;

  return (
    <div className=" inset-0 bg-background flex items-center h-screen justify-center z-50 p-2 md:p-4">
      <main className="bg-background w-full max-w-6xl h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
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
}
