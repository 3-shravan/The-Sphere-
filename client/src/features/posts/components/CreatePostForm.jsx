import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../services";
import { BadgePlus } from "lucide-react";
import { usePostFormState } from "../hooks/useFormState";
import { formatTags, validatePostForm } from "@/utils";
import { errorToast } from "@/utils";
import { SiSparkpost } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components";
import { Input } from "@/components/ui/input";

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
      className="flex flex-col gap-8 w-full font-bold font-Gilroy text-foreground text-sm max-w-6xl"
    >
      {/* Grid Layout for Caption + Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label>Caption</label>
          <textarea
            name="caption"
            placeholder="🗽"
            className="resize-none min-h-[200px] bg-input/30 p-4 rounded-xl focus-visible:ring-2"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          {preview ? (
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain bg-background"
              />
              <button
                type="button"
                onClick={clearPreview}
                className="absolute top-1 right-3 bg-input px-2 backdrop-blur-md hover:text-third text-foreground text-xl rounded-full shadow-md cursor-pointer transition"
              >
                &times;
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col bg-input/30 items-center justify-center w-full aspect-[4/3] md:aspect-[16/9] border-2 border-dashed border-border rounded-xl cursor-pointer transition hover:bg-muted/20"
              onClick={() => fileInputRef.current?.click()}
            >
              <BadgePlus className="w-10 h-10 text-second" />
              <p className="mt-2 text-sm text-muted-foreground">
                Click to upload image
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, JPEG</p>
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
        <Input
          type="text"
          name="location"
          placeholder="e.g. New York, USA"
          className="h-12 input px-4 border-0  placeholder:text-xs"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <label>Add Tags (comma-separated)</label>
        <Input
          type="text"
          name="tags"
          placeholder="Art, Expression, Learn"
          className="h-12 input px-4 border-0  placeholder:text-xs"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 py-1 items-center justify-end">
        <Button
          variant="ghost"
          disabled={isPending}
          className="border"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          variant="ghost"
          className=" text-black/80 rounded-xl border  bg-emerald-400 cursor-pointer  transition-all duration-200 font-semibold min-w-28 flex items-center justify-center disabled:bg-neutral-900 disabled:cursor-progress"
        >
          {isPending ? (
            <Spinner color="emerald-400" size="5" />
          ) : (
            <span className="flex items-center gap-1">
              <SiSparkpost className="inline" /> Upload
            </span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
