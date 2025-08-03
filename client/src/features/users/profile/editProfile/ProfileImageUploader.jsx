import { Upload, Trash2, UserCheck, X, Trash } from "lucide-react";
import { useDeleteProfilePicture } from "../../services";
import { Button } from "@/components/ui/button";
import { ProfilePicture } from "@/components";

const ProfileImageUploader = ({
  previewImage,
  profilePicture,
  handleImageChange,
  setPreviewImage,
}) => {
  const { mutate: deleteProfilePicture, isPending } = useDeleteProfilePicture();

  const handleDelete = () => {
    deleteProfilePicture();
  };

  return (
    <div className="relative flex flex-col items-center gap-2 md:mt-4 ">
      <div className=" rounded-full overflow-hidden  border-primary">
        {previewImage && (
          <X
            className="w-4 h-4 absolute mt-2 bg-neutral-700 rounded p-0.5 cursor-pointer"
            color="gray"
            onClick={() => setPreviewImage("")}
          />
        )}
        <ProfilePicture
          profilePicture={previewImage || profilePicture}
          size="32"
        />
      </div>

      <label className="flex items-center gap-2  p-2 cursor-pointer text-xs font-medium  border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
        <Upload className="w-4 h-4" />
        Upload New
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
        className="text-xs text-rose-500 flex items-center gap-2 hover:bg-muted hover:text-rose-500 border cursor-pointer"
      >
        <Trash className="w-3 h-3" />

        {isPending
          ? "Removing..."
          : profilePicture
          ? "Remove Profile Picture"
          : "No Profile Picture"}
      </Button>
    </div>
  );
};

export default ProfileImageUploader;
