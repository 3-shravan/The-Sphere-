import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { infoToast } from "@/utils";
import { Tally2 } from "lucide-react";

const PostOptions = ({ handleDeletePost }) => {
  const handleShare = () => {
    infoToast("soon you will be able to share posts");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-hidden">
        <Tally2 />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-Poppins cursor-pointer">
        <DropdownMenuLabel>⚙</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" onClick={handleDeletePost}>
          Delete Post
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleShare}>
          Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;
