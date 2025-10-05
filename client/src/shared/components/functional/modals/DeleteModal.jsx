import { Spinner } from "@/components";
import { useDeletePost } from "@/features/posts/services";

export default function DeleteModal({ postId, onCancel }) {
  const { mutateAsync: deletePost, isPending } = useDeletePost();

  return (
    <>
      <h2 className="text-lg font-semibold font-mono">Confirm Deletion</h2>
      <p className="text-sm font-medium  font-mono text-muted-foreground my-6">
        Are you sure you want to proceed with this action? This cannot be
        undone.
      </p>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 rounded-md text-sm bg-card hover:bg-accent  transition cursor-pointer "
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-md min-w-20 flex-center text-sm font-semibold bg-third text-black hover:bg-rose-600 transition cursor-pointer"
          onClick={async () => {
            await deletePost(postId);
            onCancel();
          }}
          disabled={isPending}
        >
          {isPending ? <Spinner size="4" /> : "Delete"}
        </button>
      </div>
    </>
  );
}
