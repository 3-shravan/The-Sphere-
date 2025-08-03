import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CgVercel } from "react-icons/cg";
import {
  errorToast,
  formatTags,
  stringifyTags,
  validatePostForm,
} from "@/utils";
import { useUpdatePost } from "../services";

const EditPost = ({ open, setOpen, post }) => {
  const { mutateAsync: updatePost, isPending } = useUpdatePost(post?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const tags = formData.get("tags");
    const formattedTags = formatTags(tags);
    formData.set("tags", JSON.stringify(formattedTags));

    const errors = validatePostForm(formData, false);
    if (errors) return errorToast(errors);

    const data = await updatePost(formData);
    if (data?.success) setOpen(false);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="border-none font-Gilroy flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Edit Your Post</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>

        <div className=" overflow-y-auto px-6 md:px-8 py-4 font-Gilroy grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex p-2 bg-card md:max-h-[60vh] lg:max-h-[80vh] mx-auto md:p-3 rounded-3xl justify-center items-center">
            <img
              src={post?.media}
              alt="post"
              className="w-full object-cover max-w-[44vh] rounded-3xl  "
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 justify-center items-center flex flex-col gap-2 w-full"
          >
            {/* Caption */}
            <div className="w-full md:w-3/4">
              <label htmlFor="caption" className="update-input-label">
                Caption
              </label>
              <Textarea
                name="caption"
                defaultValue={post?.caption}
                placeholder="what's your idea about this new picture 💫"
                className="resize-none h-24 font-mono text-sm"
              />
            </div>

            {/* Location */}
            <div className="w-full md:w-3/4">
              <label htmlFor="location" className="update-input-label">
                Location
              </label>
              <Input
                name="location"
                placeholder="e.g. Paris, France"
                defaultValue={post?.location}
                className="w-1/2"
              />
            </div>

            {/* Tags */}
            <div className="w-full md:w-3/4">
              <label htmlFor="tags" className="update-input-label">
                Tags
              </label>
              <Input
                name="tags"
                defaultValue={stringifyTags(post?.tags)}
                placeholder="e.g. nature, photography, travel"
                className="placeholder:text-xs font-mono font-bold"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col mt-5 w-full font-Poppins md:w-3/4 gap-2 ">
              <Button
                type="submit"
                disabled={isPending}
                variant="primary"
                className="w-full flex items-center justify-center gap-2 rounded-xl border bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-500 cursor-pointer"
              >
                <CgVercel className="w-4 h-4" />
                {isPending ? "Updating..." : "Update Post"}
              </Button>

              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditPost;
