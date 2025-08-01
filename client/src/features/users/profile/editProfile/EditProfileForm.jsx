import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WorkflowIcon } from "lucide-react";
import ProfileImageUploader from "./ProfileImageUploader";
import DateOfBirth from "./DateOfBirth";
import SelectGender from "./SelectGender";

const EditProfileForm = ({
  user,
  dob,
  setDob,
  gender,
  setGender,
  previewImage,
  handleImageChange,
  handleSubmit,
  isPending,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 md:gap-24 lg:gap-6"
    >
      {/* Left Column */}
      <div className="flex flex-col items-center gap-4 md:px-8">
        <ProfileImageUploader
          previewImage={previewImage}
          profilePicture={user?.profilePicture}
          handleImageChange={handleImageChange}
        />
        <div className="w-full md:w-3/4">
          <label
            htmlFor="name"
            className="text-xs md:text-xs text-muted-foreground px-1"
          >
            Username
          </label>
          <Input
            name="name"
            defaultValue={user?.name}
            required
            className="font-mono text-sm rounded-lg border p-2"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4 mt-2 flex flex-col items-center w-full">
        <div className="w-full md:w-3/4">
          <label
            htmlFor="fullName"
            className="text-xs md:text-xs text-muted-foreground px-1"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={user?.fullName}
            className="font-mono text-sm rounded-lg border p-2"
          />
        </div>

        <div className="flex gap-2 flex-col md:flex-row w-full md:w-3/4">
          <DateOfBirth dob={dob} setDob={setDob} />
          <SelectGender gender={gender} setGender={setGender} />
        </div>

        <div className="w-full md:w-3/4">
          <label
            htmlFor="bio"
            className="text-xs md:text-xs text-muted-foreground px-1"
          >
            Bio
          </label>
          <Textarea
            name="bio"
            defaultValue={user?.bio}
            placeholder="Tell us something about you..."
            className="resize-none h-22 rounded-lg border p-2 font-mono text-sm"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
        <Button
          type="submit"
          disabled={isPending}
          variant="secondary"
          className="md:w-[51%] mx-auto bg-emerald-600 text-black font-bold text-xs cursor-pointer"
        >
          <WorkflowIcon className="mr-2 w-4 h-4" />
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
