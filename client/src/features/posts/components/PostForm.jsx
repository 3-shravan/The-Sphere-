import {
  validatePostForm,
  formatTags,
  successToast,
  errorToast,
} from "@/utils";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../services";
import { BadgePlus } from "lucide-react";
import { usePostFormState } from "../hooks/useFormState";

const PostForm = ({ post, action }) => {
  const navigate = useNavigate();
  const {
    formState,
    errors,
    setErrors,
    preview,
    fileInputRef,
    handleChange,
    handleFileChange,
    clearPreview,
  } = usePostFormState(post);

  const createPostMutation = useCreatePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validatePostForm(
      formState,
      action,
      post?.imageUrl
    );
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    try {
      const tagsArray = formatTags(formState.tags);
      const formData = new FormData();
      formData.append("caption", formState.caption);
      formData.append("location", formState.location);
      formData.append("tags", JSON.stringify(tagsArray));
      if (formState.file) formData.append("image", formState.file);

      if (action === "Create") {
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        await createPostMutation.mutateAsync(formData);
        successToast("Post created successfully");
        navigate("/feeds");
      }
    } catch (error) {
      console.log(error || error.message);
      errorToast("Failed to create post");
    }
  };

  const isLoading = createPostMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 w-full  font-bold font-Gilroy text-foreground text-sm max-w-5xl"
    >
      <div className="flex flex-col gap-2">
        <label>Caption</label>
        <textarea
          name="caption"
          value={formState.caption}
          onChange={handleChange}
          className="h-20 bg-input p-4 rounded-xl outline-hidden border-border focus-visible:ring-1"
          rows={2}
        />
        {errors.caption && (
          <p className="text-crimson text-xs mt-1">{errors.caption}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label>Add Photos</label>
        <div className="border-3 border-dashed border-border  rounded-lg overflow-hidden">
          {preview ? (
            <div className="relative h-52">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute right-2 top-2 bg-background font-bold  bg-opacity-60 text-foreground rounded px-3 py-1.5 text-xs"
                onClick={() => {
                  clearPreview();
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              className="flex items-center justify-center h-52 cursor-pointer bg-input"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="flex flex-col items-center gap-2 uppercase font-thin font-Gilroy  ">
                <BadgePlus className="text-rose-400 " />
                <p className="text-sm">Click to upload image</p>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        {errors.file && (
          <p className="text-crimson text-xs mt-1">{errors.file}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label>Add Location</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. New York, USA"
          value={formState.location}
          onChange={handleChange}
          className="h-12 bg-input px-2 rounded-lg border-none placeholder:font-gilroy placeholder:font-light placeholder:text-muted-foreground placeholder:text-xs outline-hidden"
        />
        {errors.location && (
          <p className="text-crimson text-xs mt-1">{errors.location}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label>Add Tags (separated by comma ",")</label>
        <input
          type="text"
          name="tags"
          value={formState.tags}
          onChange={handleChange}
          placeholder="Art, Expression, Learn"
          className="h-12 bg-input px-2 rounded-lg border-none placeholder:font-gilroy placeholder:font-light placeholder:text-muted-foreground placeholder:text-xs outline-hidden"
        />
        {errors.tags && (
          <p className="text-crimson text-xs mt-1">{errors.tags}</p>
        )}
      </div>

      <div className="flex gap-4 py-1 items-center justify-end ">
        <button
          type="button"
          className="px-4 py-2.5 bg-muted text-muted-foreground font-bold rounded-lg  text-sm"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2.5 cursor-pointer bg-rose-300 text-rose-800 font-semibold rounded-lg  text-sm min-w-28 flex items-center justify-center disabled:bg-neutral-900 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-block  w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            `${action} Post`
          )}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
