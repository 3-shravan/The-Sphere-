import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../services";
import { BadgePlus } from "lucide-react";
import { usePostFormState } from "../hooks/useFormState";
import { formatTags, validatePostForm } from "@/utils";
import { errorToast } from "@/utils";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const { preview, image, fileInputRef, handleImageChange, clearPreview } =
    usePostFormState();

  const { mutateAsync: createPost, isPending } = useCreatePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (image) formData.append("image", image);

    const tags = formData.get("tags");
    const formattedTags = formatTags(tags);
    formData.delete("tags");
    // formData.set("tags", JSON.stringify(formattedTags));
    formattedTags.forEach((tag) => {
      formData.append("tags", tag);
    });

    const error = validatePostForm(formData);
    if (error) return errorToast(error);

    const response = await createPost(formData);
    if (response?.success) {
      setTimeout(() => {
        navigate("/feeds");
      }, 500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-full font-bold font-Gilroy text-foreground text-sm max-w-5xl"
    >
      {/* Caption */}
      <div className="flex flex-col gap-2">
        <label>Caption</label>
        <textarea
          name="caption"
          className="resize-none h-18 bg-input p-4 rounded-xl focus-visible:ring-2"
        />
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <label>Add Photos</label>
        <div className="border-3 border-dashed border-border rounded-lg overflow-hidden">
          {preview ? (
            <div className="relative h-52">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={clearPreview}
                className="absolute right-2 top-2 bg-background font-bold bg-opacity-60 text-foreground rounded px-3 py-1.5 text-xs"
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              className="flex items-center justify-center h-52 cursor-pointer bg-input"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-2 uppercase font-thin font-Gilroy">
                <BadgePlus className="text-second" />
                <p className="text-sm">Click to upload image</p>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2">
        <label>Add Location</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. New York, USA"
          className="h-12 bg-input px-2 rounded-lg placeholder:text-xs"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <label>Add Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          placeholder="Art, Expression, Learn"
          className="h-12 bg-input px-2 rounded-lg placeholder:text-xs"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 py-1 items-center justify-end">
        <button
          type="button"
          className="px-4 py-2.5 bg-muted text-muted-foreground font-bold rounded-lg text-sm"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2.5 bg-first text-rose-800 font-semibold rounded-lg text-sm min-w-28 flex items-center justify-center disabled:bg-neutral-900 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Create Post"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
