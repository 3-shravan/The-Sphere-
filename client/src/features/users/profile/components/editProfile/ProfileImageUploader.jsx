import { Upload, X, Trash } from "lucide-react";
import { useDeleteProfilePicture } from "../../../services";
import { Button } from "@/components/ui/button";
import { ProfilePicture } from "@/components";

const ProfileImageUploader = ({
  previewImage,
  profilePicture,
  handleImageChange,
  clearProfileImage,
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
            onClick={() => clearProfileImage()}
          />
        )}
        <ProfilePicture
          profilePicture={previewImage || profilePicture}
          size="32"
        />
      </div>

      <label className="flex items-center gap-2  p-2 cursor-pointer text-xs font-medium  border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
        <Upload className="w-4 h-4" />
        select new
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
        className="text-xs text-third flex items-center gap-2 hover:bg-muted hover:text-third border cursor-pointer"
      >
        {isPending ? (
          "Removing..."
        ) : profilePicture ? (
          <span className="flex items-center gap-1">
            <Trash className="w-2 h-2" /> Remove profile picture
          </span>
        ) : (
          "No Profile Picture"
        )}
      </Button>
    </div>
  );
};

export default ProfileImageUploader;
