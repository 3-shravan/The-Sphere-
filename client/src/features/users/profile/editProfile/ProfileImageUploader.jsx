import { Upload, Trash2 } from "lucide-react";
import { useDeleteProfilePicture } from "../../services";
import { Button } from "@/components/ui/button";

const ProfileImageUploader = ({
  previewImage,
  profilePicture,
  handleImageChange,
}) => {
  const { mutate: deleteProfilePicture, isPending } = useDeleteProfilePicture();

  const handleDelete = () => {
    deleteProfilePicture();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
        <img
          src={previewImage || profilePicture}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-primary">
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
        className="text-xs text-rose-500 flex items-center gap-2 hover:bg-muted border border-rose-400 px-3 py-1.5 rounded"
      >
        <Trash2 className="w-3 h-3" />
        {isPending ? "Removing..." : "Remove Profile Picture"}
      </Button>
    </div>
  );
};

export default ProfileImageUploader;
