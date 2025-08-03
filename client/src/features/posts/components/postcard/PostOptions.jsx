import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { infoToast } from "@/utils";
import { Tally2 } from "lucide-react";

const PostOptions = ({ setConfirmDelete, setOpen }) => {
  const handleShare = () => infoToast("soon you will be able to share posts");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-hidden">
        <Tally2 />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-Poppins bg-card cursor-pointer">
        <DropdownMenuItem
          className="cursor-pointer px-3"
          onClick={() => setOpen(true)}
        >
          ⚙ Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setConfirmDelete(true)}
        >
          ❌ Delete
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleShare}>
          🚀 Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;
