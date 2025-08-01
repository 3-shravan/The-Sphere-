import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Settings2, X } from "lucide-react";
import EditProfileForm from "./EditProfileForm";
import useEditProfile from "../hooks/useEditProfile";

const EditProfile = ({ user }) => {
  const {
    dob,
    setDob,
    gender,
    setGender,
    previewImage,
    handleImageChange,
    handleSubmit,
    isPending,
  } = useEditProfile(user);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 text-xs text-foreground cursor-pointer"
        >
          edit profile
          <Settings2 className="w-3 h-3 text-rose-500 inline ml-2" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="border-none font-Gilroy flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Edit Your Profile</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>

        <div className="overflow-y-auto px-8 py-2 flex-1 font-Poppins">
          <EditProfileForm
            user={user}
            dob={dob}
            setDob={setDob}
            gender={gender}
            setGender={setGender}
            previewImage={previewImage}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            isPending={isPending}
          />
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-[90%] md:w-[50%] mx-auto cursor-pointer"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProfile;
