import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Settings2 } from "lucide-react";
import EditProfileForm from "./EditProfileForm";
import useEditProfile from "../hooks/useEditProfile";

const EditProfile = ({ user }) => {
  const {
    dob,
    setDob,
    gender,
    setGender,
    previewImage,
    setPreviewImage,
    handleImageChange,
    handleSubmit,
    isPending,
    drawerRef,
  } = useEditProfile(user);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 text-xs text-foreground cursor-pointer"
        >
          edit profile
          <Settings2 className="w-3 h-3 text-rose-500 inline" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="border-none font-Gilroy flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Edit Your Profile</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>

        <div className="overflow-y-auto px-6 md:px-8 py-2 flex-1 font-Poppins">
          <EditProfileForm
            user={user}
            dob={dob}
            setDob={setDob}
            gender={gender}
            setGender={setGender}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            isPending={isPending}
            drawerRef={drawerRef}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProfile;
